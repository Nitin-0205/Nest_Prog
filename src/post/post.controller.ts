import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/Post.dto';
import { jwtGuard } from 'src/User/jwt/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags("Post")
@ApiBearerAuth()
@UseGuards(jwtGuard)
export class PostController {
  constructor(private readonly PostService: PostService) { }

  @Get()
  getPost() {
    return this.PostService.getPost()
  }

  @Post("new/:id")
  addPost(@Param("id", ParseIntPipe) id: number, @Body() dto: PostDto) {
    return this.PostService.addPost(id, dto)
  }

  @Patch("upd/:id")
  updatePost(@Param("id", ParseIntPipe) id: number, @Body() dto: PostDto) {
    return this.PostService.updPost(id, dto)
  }

  @Delete("del/:id")
  deletePost(@Param("id") id: number) {
    return this.PostService.delPost(id)

  }
}
