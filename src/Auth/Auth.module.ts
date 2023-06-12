import { Module } from "@nestjs/common";
import { AuthContro } from "./Auth.controller";
import { AuthSer } from "./Auth.service";
import { PrismaService } from "prisma/prisma.service";
import { prismaModule } from "prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { BodyGuard } from "./Auth.guard";
import { AuthIntercept } from "./Auth.Interceptor";
import { JwtStrategy } from "./Jwt.strategy";
import { jwtGuard } from "./Jwt.guard";
import { dbModule } from "src/ORMDatabase/db.module";
import { OrmProvider } from "./Dto/Orm.provider";

export const jwtKey= "secret_sigma007";
@Module({
    controllers:[AuthContro],
    imports:[
        dbModule,
        // prismaModule,PassportModule,
        JwtModule.register({
        secret:jwtKey,
        signOptions:{expiresIn:"5m"}
    })],
    providers:[
        ...OrmProvider,
        AuthSer,jwtGuard,BodyGuard,AuthIntercept,JwtStrategy],
    exports:[jwtGuard]
})
export class AuthModule{}
