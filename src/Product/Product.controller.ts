import { Body, Controller,UseGuards, Get, Param, Post } from "@nestjs/common";
import { ProductDto } from "./Dto";
import { ProductServices } from "./Product.service";
import { ApiTags } from "@nestjs/swagger";
import { jwtGuard } from "src/Auth/Jwt.guard";

@ApiTags("Product")
@UseGuards(jwtGuard)
@Controller("Product")
export class ProductControl{
    constructor(private ProdctServ :ProductServices ){

    }
    @Post("addProdct")
    addProdct(@Body()dto :ProductDto){
        return this.ProdctServ.addProdct(dto)
    }
    @Get("getProdct")
    getProdct(){
        return this.ProdctServ.getProdct()
    }
    @Get("getProdctById/:ConsumerId")
    getProdctById(@Param('ConsumerId')ConsumerId:string){
        return this.ProdctServ.getProdctById(ConsumerId)
    }
    @Post("updProdctById")
    updProdctById(@Param('ConsumerId')ConsumerId:string,@Body()dto:ProductDto){
        return this.ProdctServ.updProdctById(ConsumerId,dto)
    }

}