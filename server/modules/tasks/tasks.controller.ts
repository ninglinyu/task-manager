import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IsString, IsIn, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

import { TasksService } from './tasks.service';
import type {
  Task,
  TaskPriority,
  TaskListResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '@shared/api.interface';

class CreateTaskDto implements CreateTaskRequest {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsIn(['高', '中', '低'])
  priority!: '高' | '中' | '低';
}

class UpdateTaskDto implements UpdateTaskRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsIn(['高', '中', '低'])
  priority?: '高' | '中' | '低';

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Query('priority') priority?: string): Promise<TaskListResponse> {
    const validPriority = priority === '高' || priority === '中' || priority === '低'
      ? priority as TaskPriority
      : undefined;
    const items: Task[] = await this.tasksService.findAll(validPriority);
    return { items };
  }

  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(parseInt(id, 10), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(parseInt(id, 10));
  }
}
