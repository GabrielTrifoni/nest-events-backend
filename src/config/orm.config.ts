import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/app/auth/profile.entity';
import { User } from 'src/app/auth/user.entity';
import { Attendee } from 'src/app/entities/attendee.entity';
import { Event } from 'src/app/entities/event.entity';
import { Subject } from 'src/app/school/subject.entity';
import { Teacher } from 'src/app/school/teacher.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Event, Attendee, Subject, Teacher, User, Profile],
    synchronize: true,
  }),
);
