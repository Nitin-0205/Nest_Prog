import { CallHandler, ExecutionContext, Injectable ,NestInterceptor} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthIntercept implements NestInterceptor{
    intercept(context:ExecutionContext,next:CallHandler ): Observable<any>{
        var ctx = context.switchToHttp().getRequest<Request>()
        ctx.body.name = "Name From InterCeptor"
        console.log("Interceptor")
        return next.handle().pipe(map((data)=>{
            return "Interceptor changed Response"
        }));

    }

}
    
