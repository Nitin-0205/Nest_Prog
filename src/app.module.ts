import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './User/user.module';
import { Profile } from './entities/user_profile.entity';
import { Post } from './entities/post.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UserModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host :"localhost",
      port:5432,
      username:"postgres",
      password:"1234",
      database:"sql_demo",
      entities :[User,Profile,Post],
      synchronize:true,
    }),
    PostModule,
    ProfileModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
