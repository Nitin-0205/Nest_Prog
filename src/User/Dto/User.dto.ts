import { IsString,IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto{
    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    
    userName :string;

    @IsNumber()
    @IsNotEmpty() 
    @ApiProperty()
    contact:number;

    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    email:string;

    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    password:string;
}

export class UserLoginDto{
    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    email:string;

    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    password:string;

}