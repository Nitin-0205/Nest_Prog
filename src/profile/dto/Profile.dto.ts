import { Transform } from "class-transformer";
import { IsString,IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name :string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name :string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email :string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(val =>val.toString())
    age:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address :string ;

}