import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseInterceptors, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { UserServices } from "./user.service";
import { UserDto, UserLoginDto } from "./Dto/User.dto";
// import { ProfileDto } from "./Dto/Profile.dto";
import { userInterceptor } from "./Interceptor/user.interceptor";
import { PostDto } from "../post/dto/Post.dto";
import { jwtGuard } from "./jwt/jwt.guard";
import { ApiTags } from "@nestjs/swagger";


@Controller("us")
@ApiTags("User")

export class UserController {
    constructor(private UserService: UserServices) { }


    @Get()
    @UseInterceptors(userInterceptor)
    getUSer() {
        return this.UserService.getAll()
    }

    @Post("login")
    login(@Body() dto: UserLoginDto) {
        return this.UserService.login(dto)
    }

    @Post("new")
    addUSer(@Body() dto: UserDto) {
        return this.UserService.addNew(dto)
    }

    @Patch("upd/:id")
    updateUSer(@Param("id") id: number, @Body() dto: UserDto) {
        return this.UserService.updUser(id, dto)
    }
    @Delete("del/:id")
    deleteUSer(@Param("id") id: number) {
        return this.UserService.delUser(id)
    }


    /////////////////////////////////////////Profile////////////////////////////////////////////



}