import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/app/entities/profile.entity';
import { Attendee } from 'src/app/entities/attendee.entity';
import { Event } from 'src/app/entities/event.entity';
import { Subject } from 'src/app/school/subject.entity';
import { Teacher } from 'src/app/school/teacher.entity';
import { User } from 'src/app/entities/user.entity';

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
