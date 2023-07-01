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


  async getPost() {
    const data = await this.postRepo.find({ relations: ['user'] });
    if(data.length == 0){
      throw new HttpException('No Post Yet', HttpStatus.NOT_FOUND);
    }
    return data;
  }
  
  async getUserPost(emailid){
    // const dal = await this.userRepo.createQueryBuilder().select( ).where("email = :email", { email: emailid }).getOne();
    // console.log(dal)

    const data = await this.postRepo.find({relations: ['user'], where: { email: emailid } });
    console.log(data.length)

    if(data.length === 0){
      throw new HttpException('No Post Yet', HttpStatus.NOT_FOUND);
    }
    return data;

  }

  async addPost(dto: PostDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
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

  async updPost(dto: PostDto) {
    const up = await this.postRepo.update({ email:dto.email }, { ...dto });
    if (up) {
      return { message: `User Detail updated for Id ${dto.email}` };
    }
  }

  async delPost(id,email) {
    const del = await this.postRepo.delete({ id,email: email });

    if (del) {
      return { message: 'User Delelted Successful !!!' };
    }
  }
}
