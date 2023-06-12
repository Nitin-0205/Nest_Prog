import { Body,Get, Controller, Post, UseGuards,UseInterceptors } from "@nestjs/common";
import { AuthSer } from "./Auth.service";
import { LoginDto, SignUpDto } from "./Dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BodyGuard } from "./Auth.guard";
import { AuthIntercept } from "./Auth.Interceptor";
import { jwtGuard } from "./Jwt.guard";


@ApiTags("User Authentication")
@Controller("Auth")
export class AuthContro{
    constructor(private AuthSer :AuthSer){}

    // @UseGuards(jwtGuard,BodyGuard)
    @Get()
    @ApiBearerAuth()
    findall(){
        return this.AuthSer.all()
    }
    @Post("signup")
    addUser(
        @Body()SignUpDto:SignUpDto
    ){
        return this.AuthSer.signup(SignUpDto)
    }


    @Post("login")
    // @UseInterceptors(AuthIntercept)
    loginUser(
        @Body() LoginDto:LoginDto
    ){
        console.log(LoginDto)
        return this.AuthSer.signin(LoginDto)
    }
}