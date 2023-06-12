import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";


@Injectable()
export class ProductServices{
    constructor(private Prisma:PrismaService){}
    async addProdct(dto){
        try{
            const insert = await this.Prisma.product.create({
                data:dto
            })
            if(insert){
                return {'msg': "New Product add successful"}
            }else{
            throw new InternalServerErrorException("Failed to add Product")
            
        }
        }catch(err){
            return new HttpException(err,500)
        }
    }
    async getProdct(){
        const found  = await this.Prisma.product.findMany({
        })
        if(found){
            return found;
        }else{
        throw new NotFoundException("No Product Added Yet !!!")
        
    }
    }
    async getProdctById(ConsumerId){
        const found  = await this.Prisma.product.findMany({
            where:{
            ConsumerId:ConsumerId
            }
        })
        if(found){
            return found;
        }else{
        throw new NotFoundException(`No Product found with Id ${ConsumerId} !!!`)
        
    }
    }
    async updProdctById(ConsumerId ,dto ){
        const found  = await this.Prisma.product.updateMany({
            where:{
                ConsumerId:ConsumerId
            },
            data:dto
        })
        if(found){
            return found;
        }else{
        throw new NotFoundException(`No Product found with Id ${ConsumerId} !!!`)
        
    }
    }

}