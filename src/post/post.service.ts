import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/Post.dto';
import { Post } from 'src/entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  @InjectRepository(Post) private postRepo: Repository<Post>,){}


  getPost() {
    const data = this.postRepo.find({ relations: ['user'] });
    return data;
  }

  async addPost(id, dto: PostDto) {
    const user = await this.userRepo.findOneBy({ id, email: dto.email });
    if (!user) {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_FOUND);
    }

    const add = await this.postRepo.save({ ...dto, user });
    // user.post  = add;
    // const sav = this.userRepo.save(user);
    if (add) {
      return { message: 'New Post Added Successfull' };
    } else {
      throw new HttpException('User Not Exist !!!', HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async updPost(id, dto: PostDto) {
    const up = await this.postRepo.update({ id }, { ...dto });
    if (up) {
      return { message: `User Detail updated for Id ${id}` };
    }
  }

  async delPost(id) {
    const del = await this.postRepo.delete({ id });

    if (del) {
      return { message: 'User Delelted Successful !!!' };
    }
  }
}
