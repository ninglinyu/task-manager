export type TaskPriority = '高' | '中' | '低';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  created_at: string;
}

export interface TaskListResponse {
  items: Task[];
}

export interface CreateTaskRequest {
  title: string;
  priority: TaskPriority;
}

export interface UpdateTaskRequest {
  title?: string;
  priority?: TaskPriority;
  completed?: boolean;
}
