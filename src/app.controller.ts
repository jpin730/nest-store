import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Task } from './common/entities/task.entity';

@ApiTags('Hello World!')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  getTasks(): Promise<Task[]> {
    return this.appService.getTasks();
  }
}
