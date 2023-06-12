import { Module } from "@nestjs/common";
import { prismaModule } from "prisma/prisma.module";
import { ProductServices } from "./Product.service";
import { ProductControl } from "./Product.controller";

@Module({
    imports:[prismaModule],
    controllers:[ProductControl],
    providers:[ProductServices],
    exports:[ProductServices],


})
export class ProductModule{

}