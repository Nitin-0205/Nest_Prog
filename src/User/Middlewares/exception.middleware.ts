import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class UserExceptionMiddleware implements  NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log(res);
        next();

    }

    
}