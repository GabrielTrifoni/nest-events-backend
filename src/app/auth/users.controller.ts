import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = new User();

        if (createUserDto.password !== createUserDto.retypedPassword) {
            throw new BadRequestException(['Passwords are not identical']);
        }

        const existingUsername = await this.userRepository.findOne({
            where: [{ username: createUserDto.username }]
        });

        if (existingUsername) {
            throw new BadRequestException(['Username is already taken'])
        }

        const existingEmail = await this.userRepository.findOne({
            where: [{ email: createUserDto.email }]
        });

        if (existingEmail) {
            throw new BadRequestException(['Email is already taken'])
        }

        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        return {
            ...(await this.userRepository.save(user)),
            token: this.authService.getTokenForUser(user),
        }
    }
}