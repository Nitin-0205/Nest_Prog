import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    qty: number;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNumber()
    @ApiProperty()
    Catagories:string

}
