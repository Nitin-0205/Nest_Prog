import { IsString,IsEmail,IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;
}

export class SignUpDto {


    @ApiProperty()
    @IsString()
    name :string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;
}