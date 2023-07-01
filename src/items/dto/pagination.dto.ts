import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PageDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    offset:string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    limit:string;

}