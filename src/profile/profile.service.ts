import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/Profile.dto';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/user_profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ){}

  getProfile() {
    const data = this.profileRepo.find();
    return data;

    if (data) {
      throw new HttpException('No Profile Yet', HttpStatus.NO_CONTENT);
    }
  }

  async addProfile(id, dto: ProfileDto) {
    const user = await this.userRepo.findOneBy({ id, email: dto.email });
    if (!user) {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
    }
    const add = await this.profileRepo.save(dto);
    user.profile = add;
    const sav = this.userRepo.save(user);
    if (sav) {
      return { message: 'New Profile Added Successfull' };
    } else {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async updProfile(id, dto: ProfileDto) {
    const up = await this.profileRepo.update({ id }, { ...dto });
    if (up) {
      return { message: `User Detail updated for Id ${id}` };
    }
  }

  async delProfile(id) {
    const del = await this.profileRepo.delete({ id });

    if (del) {
      return { message: 'User Delelted Successful !!!' };
    }
  }
}
