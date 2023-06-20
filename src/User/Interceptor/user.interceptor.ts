import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class userInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
        // console.log(context);
        const now = Date.now();
        return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)),);
      }
}