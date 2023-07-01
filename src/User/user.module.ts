import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/user_profile.entity';
import { Post } from 'src/entities/post.entity';
import { UserScheduledTask } from './user.task';
import { TaskMiddleware } from './Middlewares/user.middleware';
import { UserExceptionMiddleware } from './Middlewares/exception.middleware';
import { jwtGuard } from './jwt/jwt.guard';
import { JwtStategy } from './jwt/jwt.stategy';
import { JwtModule } from '@nestjs/jwt';

export const Jwtkey = 'Sigma_secret007'

@Module({
  imports: [
    JwtModule.register({
      secret: Jwtkey,
      signOptions: {
        expiresIn: "45d"
      }
    }),
    TypeOrmModule.forFeature([User, Profile, Post])],

  controllers: [UserController],

  providers: [
    jwtGuard, JwtStategy,
    UserServices,
    UserScheduledTask,
    { provide: 'NameProvider', useValue: { name: 'Rahul', age: 16 } },
    TaskMiddleware,
    UserExceptionMiddleware,
  ],

  exports: [TaskMiddleware,jwtGuard],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TaskMiddleware)
      .forRoutes(UserController);
  }
}
