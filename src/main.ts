import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder ,SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Request,Response ,NextFunction } from 'express';

function Global(Request,Response ,next:NextFunction ){
  console.log("Hello I Am Global Middleware ")
  next()

}
function Global2(Request,Response ,next:NextFunction ){
  console.log("Hello I Am Global Middleware 2")
  next()

}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Global,Global2)
  const config = new DocumentBuilder()
  .setTitle("Median")
  .setDescription("Swagger Description ")
  .addBearerAuth()
  .build()

  const doc  = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,doc)

  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
