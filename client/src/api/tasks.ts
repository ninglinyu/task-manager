import { supabase } from '@/lib/supabase';
import type {
  Task,
  TaskPriority,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '@shared/api.interface';

export async function getTasks(priority?: TaskPriority): Promise<Task[]> {
  let query = supabase.from('tasks').select('*').order('created_at', { ascending: false });

  if (priority) {
    query = query.eq('priority', priority);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Task[];
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const { data: result, error } = await supabase
    .from('tasks')
    .insert({ title: data.title, priority: data.priority })
    .select()
    .single();

  if (error) throw error;
  return result as Task;
}

export async function updateTask(id: number, data: UpdateTaskRequest): Promise<Task> {
  const patch: Record<string, unknown> = {};
  if (data.title !== undefined) patch.title = data.title;
  if (data.priority !== undefined) patch.priority = data.priority;
  if (data.completed !== undefined) patch.completed = data.completed;

  const { data: result, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result as Task;
}

export async function deleteTask(id: number): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}
