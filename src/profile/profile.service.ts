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

  async getProfile() {
    const data = await this.profileRepo.find();
    console.log(data);
    if (!data) {
      throw new HttpException('No Profile Yet', HttpStatus.NO_CONTENT);
    }
    return data;

    
  }
  
  async getUserProfile(emailid) {
  
    const data = await this.profileRepo.findOneBy({email: emailid});
    console.log(data);

    if (data === null) {
      throw new HttpException('No User Profile Yet', HttpStatus.NOT_FOUND);
    }
    return data;

    
  }

  async addProfile(dto: ProfileDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user) {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
    }
    const userprof = await this.profileRepo.findOneBy({ email: dto.email });
    if (userprof) {
      throw new HttpException('User Profile Already Exist !!!', HttpStatus.NOT_FOUND);
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

  async updProfile(dto: ProfileDto) {
    const up = await this.profileRepo.update({ email:dto.email}, { ...dto });
    if (up) {
      return { message: `User Detail updated for Id ${dto.email}` };
    }
  }

  async delProfile(emailid) {
    const user = await this.userRepo.findOneBy({ email: emailid });
    if (!user) {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
    }
    const userprof = await this.profileRepo.findOneBy({ email: emailid });
    if (!userprof) {
      throw new HttpException('User Profile Not Exist !!!', HttpStatus.NOT_FOUND);
    }

    const del = await this.profileRepo.delete({ email: emailid });

    if (del) {
      return { message: 'User Deleted Successful !!!' };
    }
  }
}
