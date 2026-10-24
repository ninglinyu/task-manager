import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';
import type {
  Task,
  TaskPriority,
  TaskListResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '@shared/api.interface';

export async function getTasks(priority?: TaskPriority): Promise<Task[]> {
  const url = priority ? `/api/tasks?priority=${priority}` : '/api/tasks';
  const response = await axiosForBackend.get<TaskListResponse>(url);
  return response.data.items;
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const response = await axiosForBackend.post<Task>('/api/tasks', data);
  return response.data;
}

export async function updateTask(id: number, data: UpdateTaskRequest): Promise<Task> {
  const response = await axiosForBackend.patch<Task>(`/api/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await axiosForBackend.delete(`/api/tasks/${id}`);
}
