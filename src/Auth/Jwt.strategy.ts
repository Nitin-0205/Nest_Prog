import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthSer } from "./Auth.service";
import { jwtKey } from "./Auth.module";
import { LoginDto } from "./Dto";


@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy,"jwt"){
    constructor(private AuthSer:AuthSer){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:jwtKey
        })
    }
    async validate(payload :LoginDto){
        const user = await this.AuthSer.all()
        if(!user){
            throw new UnauthorizedException()
        }
        return user

    }

}