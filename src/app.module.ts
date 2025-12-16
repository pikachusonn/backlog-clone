import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './Project/project.module.js';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
