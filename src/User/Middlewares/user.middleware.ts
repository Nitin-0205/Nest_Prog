import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class TaskMiddleware implements NestMiddleware {
    use(req, res, next) {
        console.log("Request... at the Middleware");
        next();
    }
}