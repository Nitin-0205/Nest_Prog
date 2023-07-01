import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseInterceptors, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { UserServices } from "./user.service";
import { UserDto, UserLoginDto, UserUpdDto } from "./Dto/User.dto";
// import { ProfileDto } from "./Dto/Profile.dto";
import { userInterceptor } from "./Interceptor/user.interceptor";
import { PostDto } from "../post/dto/Post.dto";
import { jwtGuard } from "./jwt/jwt.guard";
import { ApiTags } from "@nestjs/swagger";


@Controller("us")
@ApiTags("User")

export class UserController {
    constructor(private UserService: UserServices) {}


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

    @Patch("upd/:emailid")
    updateUSer(@Param("emailid") emailid: string, @Body() dto: UserUpdDto) {
        return this.UserService.updUser(emailid, dto)
    }

    @Delete("del/:emailid")
    deleteUSer(@Param("emailid") emailid: string) {
        return this.UserService.delUser(emailid)
    }


}