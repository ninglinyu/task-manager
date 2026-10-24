import { Injectable, NotFoundException } from '@nestjs/common';

import { supabase } from '@server/common/supabase';
import type { Task, TaskPriority, CreateTaskRequest, UpdateTaskRequest } from '@shared/api.interface';

@Injectable()
export class TasksService {
  async findAll(priority?: TaskPriority): Promise<Task[]> {
    let query = supabase.from('tasks').select('*').order('created_at', { ascending: false });

    if (priority) {
      query = query.eq('priority', priority);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Task[];
  }

  async create(dto: CreateTaskRequest): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert({ title: dto.title, priority: dto.priority })
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  }

  async update(id: number, dto: UpdateTaskRequest): Promise<Task> {
    const patch: Record<string, unknown> = {};
    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.priority !== undefined) patch.priority = dto.priority;
    if (dto.completed !== undefined) patch.completed = dto.completed;

    if (Object.keys(patch).length === 0) {
      throw new NotFoundException('未提供可更新字段');
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(patch)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException('任务不存在');
    return data as Task;
  }

  async remove(id: number): Promise<void> {
    const { error, status } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    if (status === 406) throw new NotFoundException('任务不存在');
  }
}
