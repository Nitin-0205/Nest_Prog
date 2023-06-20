import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/user_profile.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Profile,User]),UserModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})

export class ProfileModule {}
