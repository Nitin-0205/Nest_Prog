import { IsNumber } from "@nestjs/class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProductDto{

    @ApiProperty()
    @IsString()
    Name :String;

    @ApiProperty()
    @IsString()
    Description:String;

    @ApiProperty()
    @IsNumber()
    Price:number;

    @ApiProperty()
    @IsString()
    ConsumerId :String;

}