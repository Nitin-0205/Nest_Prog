import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateItemDto } from "./create-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ItemFilterDto{
    @IsString()
    @ApiProperty()
    @IsOptional()
    name: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    qty: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    price: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    Catagories:string

}