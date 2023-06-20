import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PostDto{
    @IsString() 
    @ApiProperty()
    title : string;

    @IsString()
    @ApiProperty()
    description :string;

    @IsString()
    @ApiProperty()
    email :string;


}