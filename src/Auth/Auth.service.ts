import { Injectable, NotImplementedException, ForbiddenException, NotFoundException, Inject } from "@nestjs/common/"
import { LoginDto, SignUpDto } from "./Dto"
import { PrismaService } from "prisma/prisma.service"
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2"
import { json } from "stream/consumers";
import { Repository } from "typeorm";
import { SignUpOrm } from "./Dto/Orm.Entity";

@Injectable()
export class AuthSer {
    constructor(
        @Inject("SIGN_REPO") private userRepo: Repository<SignUpOrm>,
        // private prisma:PrismaService,
        private jwt: JwtService
    ) { }

    // async all(){
    //     return await this.prisma.user.findMany()
    // }
    // async findid(userId:string){     

    //     return await this.prisma.user.findFirst({
    //         where:{
    //             email:userId
    //         }
    //     })
    // }
    // async signup(SignUpDto:SignUpDto){
    //     const password = await  argon.hash(SignUpDto.password)
    //     try{
    //         const newData  = await this.prisma.user.create({
    //             data:{
    //                 name :SignUpDto.name,
    //                 email:SignUpDto.email,
    //                 password:password
    //             }
    //         })

    //         if(newData){

    //             return {"msg" :"New User Add Successfull !!!"}
    //         }else{
    //             throw new NotImplementedException("user already Exist !!!")
    //         }
    //     }catch{
    //         throw new NotImplementedException("user already Exist !!!")
    //     }


    // }
    // async signin(LoginDto:LoginDto){

    //     const found  = await this.prisma.user.findFirst({
    //         where:{
    //             email:LoginDto.email
    //         }
    //     })
    //     if(found){
    //         const isMatch = await argon.verify(found.password,LoginDto.password)
    //     console.log(found)

    //     if(found){
    //         const token = await this.jwt.signAsync(LoginDto)

    //         return {"access_token" :token}
    //     }else{
    //         throw new ForbiddenException("Invalid Credential")
    //     }
    //     }else{
    //         throw new NotFoundException("User Not Found");
    //     }
    // }

    async all(): Promise<SignUpOrm[]> {
        return await this.userRepo.find()

    }
    async findid(userId: string) {
    }
    async signup(SignUpDto: SignUpDto) {

        const password = await argon.hash(SignUpDto.password)

        try {
            const newData = await this.userRepo.save({
                name: SignUpDto.name,
                email: SignUpDto.email,
                password: password
            
        })

        if (newData) {

            return { "msg": "New User Add Successfull !!!" }
        } else {
            throw new NotImplementedException("user already Exist !!!")
        }
    }catch {
        throw new NotImplementedException("user already Exist !!!")
    }
    }
    async signin(LoginDto: LoginDto){

}
}