import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import {AuthGuard} from "@nestjs/passport"

@Injectable()
export class jwtGuard extends AuthGuard("jwt"){
    
}