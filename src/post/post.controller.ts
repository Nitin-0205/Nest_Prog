import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors,UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/Post.dto';
import { jwtGuard } from 'src/User/jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { uuid } from 'uuidv4';

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

  @Get("userPost/:emailid")
  getUserPost(@Param("emailid") emailid: string,) {
    return this.PostService.getUserPost(emailid)
  }


  // @Post("upload")
  // @ApiBody({
  //   type: "object",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       image: {
  //         type: "string",
  //         format: "binary",
  //       },
  //     },
  //   },
  // })
  // @ApiConsumes("multipart/form-data")
  // @UseInterceptors(FileInterceptor('image',{
  //   dest: './uploads',
  //   storage:diskStorage({
  //     destination: './uploads',
  //     filename:(req,file,cb)=>{
  //       const filename: string = file.originalname.split('.')[0]
  //       const fileExt: string = extname(file.originalname)
  //       console.log(`${uuid}${filename}${fileExt}`)
  //       cb(null,`${uuid()}${filename}${fileExt}`)
  //     },
  //   })
  // }))
  // uploadPost(@UploadedFile() file) {
  //   console.log(file)
  //   return "success";

  // }
  


  @Post("new")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary",
        },
        title:{type:"string"},
        description:{type:"string"},
        email:{type:"string"}
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('image',{
    dest: './uploads',
    storage:diskStorage({
      destination: './uploads',
      filename:(req,file,cb)=>{
        const filename: string = file.originalname.split('.')[0]
        const fileExt: string = extname(file.originalname)
        console.log(`${uuid}${filename}${fileExt}`)
        cb(null,`${uuid()}${filename}${fileExt}`)
      },
    })
  }))
  addPost(@UploadedFile() file:Express.Multer.File, 
  @Body("title") title:string,
  @Body("description") description:string,
  @Body("email") email:string,
  ) {
    const fileName = file.filename;
    const dto = {title,description,email,image:fileName}
    return this.PostService.addPost(dto)
  }

  @Patch("upd")
  updatePost(@Body() dto: PostDto) {
    return this.PostService.updPost(dto)
  }

  @Delete("del/:id")
  deletePost(@Param("id") id: string,@Body("email") email: string ) {
    return this.PostService.delPost(id,email)

  }
}
