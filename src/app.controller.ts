import { Body, Controller, Get, ParseBoolPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body("name")name:any): string {
    return this.appService.getHello();
  }
}
