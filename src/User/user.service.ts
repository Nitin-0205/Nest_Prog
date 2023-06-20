import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';
import { UserDto, UserLoginDto } from './Dto/User.dto';
import { Profile } from 'src/entities/user_profile.entity';
// import { ProfileDto } from './Dto/Profile.dto';
import { Post } from 'src/entities/post.entity';
import { PostDto } from '../post/dto/Post.dto';
import { UserScheduledTask } from './user.task';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UserException } from './Exception/user.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    // @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private sheduleRegister: SchedulerRegistry,
    private jwt: JwtService,
    @Inject('NameProvider') private nameProvider: any,
  ) { }

  getAll() {
    const job = this.sheduleRegister.getCronJob('notification');
    job.start();
    // job.stop();
    console.log(job.lastDate());
    console.log(this.nameProvider);

    // throw new UserException();
    return this.userRepo.find({ relations: ['profile'] });
  }

  async login(dto: UserLoginDto) {
    const user = await this.userRepo.find({ where: { email: dto.email } });
    if (user.length == 0) {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
    }
    if (user[0].password == dto.password) {

      const token = this.jwt.sign({ id: user[0].id, email: user[0].email });
      console.log(token)
      return { message: "Login Successfull !!!" ,token:token}
    } else {
      throw new HttpException('Password is Incorrect !!!', HttpStatus.NOT_FOUND);
    }

  }
  async addNew(dto: UserDto) {
    const check = await this.userRepo.find({ where: { email: dto.email } });
    console.log();
    if (check.length == 0) {
      const add = await this.userRepo.save(dto);
      if (add) {
        return { message: 'New User Added Successfull' };
      } else {
        return { message: 'New User Add Failed' };
      }
    } else {
      throw new HttpException('User Already Exist !!!', HttpStatus.CONFLICT);
    }
  }

  async updUser(id, dto: UserDto) {
    const match = await this.userRepo.find();

    if (match) {
      const up = await this.userRepo.update({ id }, { ...dto });
      if (up) {
        return { message: `User Detail updated for Id ${id}` };
      }
    }
  }

  async delUser(id) {
    const del = await this.userRepo.delete({ id });

    if (del) {
      return { message: 'User Delelted Successful !!!' };
    }
  }

  //   getProfile() {
  //     const data = this.profileRepo.find();
  //     return data;

  //     if (data) {
  //       throw new HttpException('No Profile Yet', HttpStatus.NO_CONTENT);
  //     }
  //   }

  //   async addProfile(id, dto: ProfileDto) {
  //     const user = await this.userRepo.findOneBy({ id, email: dto.email });
  //     if (!user) {
  //       throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
  //     }
  //     const add = await this.profileRepo.save(dto);
  //     user.profile = add;
  //     const sav = this.userRepo.save(user);
  //     if (sav) {
  //       return { message: 'New Profile Added Successfull' };
  //     } else {
  //       throw new HttpException('User Not Exist !!!', HttpStatus.NOT_IMPLEMENTED);
  //     }
  //   }

  //   async updProfile(id, dto: ProfileDto) {
  //     const up = await this.profileRepo.update({ id }, { ...dto });
  //     if (up) {
  //       return { message: `User Detail updated for Id ${id}` };
  //     }
  //   }

  //   async delProfile(id) {
  //     const del = await this.profileRepo.delete({ id });

  //     if (del) {
  //       return { message: 'User Delelted Successful !!!' };
  //     }
  //   }

  //////////////////////////////////Post////////////////////////////////////////////

  // getPost() {
  //   const data = this.postRepo.find({ relations: ['user'] });
  //   return data;
  // }

  // async addPost(id, dto: PostDto) {
  //   const user = await this.userRepo.findOneBy({ id, email: dto.email });
  //   if (!user) {
  //     throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
  //   }

  //   const add = await this.postRepo.save({ ...dto, user });
  //   // user.post  = add;
  //   // const sav = this.userRepo.save(user);
  //   if (add) {
  //     return { message: 'New Post Added Successfull' };
  //   } else {
  //     throw new HttpException('User Not Exist !!!', HttpStatus.NOT_IMPLEMENTED);
  //   }
  // }

  // async updPost(id, dto: PostDto) {
  //   const up = await this.postRepo.update({ id }, { ...dto });
  //   if (up) {
  //     return { message: `User Detail updated for Id ${id}` };
  //   }
  // }

  // async delPost(id) {
  //   const del = await this.postRepo.delete({ id });

  //   if (del) {
  //     return { message: 'User Delelted Successful !!!' };
  //   }
  // }
}
