import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
@Injectable()
export class BodyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const rec = ctx.getRequest<Request>();
        const [type, token] = rec.headers.authorization?.split(' ') ?? [];
        console.log("BodyGuard run for login",type ," ",token)
        console.log("Guard")
        if(rec.header("name") == "Nitin" ){
            return false
        }
        return true;
    }
}