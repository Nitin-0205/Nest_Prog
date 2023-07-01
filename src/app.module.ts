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
import { typeOrmDataSrc } from './db/datasource';
import { ItemsModule } from './items/items.module';


@Module({
  imports: [UserModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmDataSrc),
    PostModule,
    ProfileModule,
    ItemsModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
