import { HttpException, HttpStatus } from "@nestjs/common";

export class UserException extends HttpException {
    constructor() {
        super("Custom Exception For No User Found", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}