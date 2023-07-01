import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import { UserServices } from "../user.service";
import { ExtractJwt } from "passport-jwt";
import { Jwtkey } from "../user.module";

export class JwtStategy extends PassportStrategy(Strategy,"jwt"){
    constructor(){ 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:Jwtkey
        })
    }

    validate(){
        return true;
    }
}