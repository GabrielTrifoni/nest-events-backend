import { ClassSerializerInterceptor, Controller, Get, Post, Request, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "../entities/user.entity";
import { AuthGuardLocal } from "./auth-guard.local";
import { AuthGuardJwt } from "./auth-guard.jwt";

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User) {
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user),
        }
    }

    @Get('profile')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async getProfile(@CurrentUser() user: User) {
        return user;
    }
}