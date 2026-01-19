import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './Project/project.module.js';
import { AuthModule } from './Auth/auth.module.js';
import { TaskModule } from './Tasks/task.module.js';
import { TaskStatusModule } from './TaskStatus/taskStatus.module.js';
import { TransitionModule } from './Transitions/transition.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProjectModule,
    TaskModule,
    AuthModule,
    TaskStatusModule,
    TransitionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
