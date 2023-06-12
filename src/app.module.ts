import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/Auth.module';
import { ProductModule } from './Product/Product.module';
import { DbProvider } from './ORMDatabase/db.provider';

@Module({
  imports: [ProductModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}