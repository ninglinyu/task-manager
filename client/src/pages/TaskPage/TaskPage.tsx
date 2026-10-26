import React, { useState } from 'react';
import { Plus, Check, Trash2, Filter } from 'lucide-react';
import { toast } from 'sonner';

import type { Task, TaskPriority } from '@shared/api.interface';
import { getTasks, createTask, updateTask, deleteTask } from '@/api/tasks';

const priorityColors: Record<TaskPriority, string> = {
  高: 'bg-red-100 text-red-700 border-red-200',
  中: 'bg-amber-100 text-amber-700 border-amber-200',
  低: 'bg-green-100 text-green-700 border-green-200',
};

type FilterValue = '全部' | TaskPriority;

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('中');
  const [filter, setFilter] = useState<FilterValue>('全部');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const loadTasks = async (f: FilterValue = filter) => {
    setLoading(true);
    try {
      const prio = f === '全部' ? undefined : f;
      const data = await getTasks(prio);
      setTasks(data);
    } catch (error) {
      console.error('加载任务失败', error);
      toast.error('加载任务失败');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (f: FilterValue) => {
    setFilter(f);
    loadTasks(f);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    try {
      const newTask = await createTask({ title: title.trim(), priority });
      setTasks((prev) => [newTask, ...prev]);
      setTitle('');
      setPriority('中');
      toast.success('任务已添加');
    } catch (error) {
      console.error('添加任务失败', error);
      toast.error('添加任务失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (error) {
      console.error('更新任务失败', error);
      toast.error('更新任务失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('任务已删除');
    } catch (error) {
      console.error('删除任务失败', error);
      toast.error('删除任务失败');
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">智能任务管理</h1>
          <p className="text-slate-500">高效管理你的每日任务</p>
        </div>

        <form onSubmit={handleAddTask} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入任务内容..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition cursor-pointer"
            >
              <option value="高">高优先级</option>
              <option value="中">中优先级</option>
              <option value="低">低优先级</option>
            </select>
            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              添加
            </button>
          </div>
        </form>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600 font-medium">按优先级筛选</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['全部', '高', '中', '低'] as FilterValue[]).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-400">加载中...</div>
          ) : tasks.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              <div className="text-5xl mb-3">📋</div>
              <p>暂无任务，快来添加一个吧</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="p-4 flex items-center gap-3 hover:bg-slate-50 transition"
                >
                  <button
                    onClick={() => handleToggleComplete(task)}
                    aria-label={task.completed ? '标记为未完成' : '标记为已完成'}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-300 hover:border-blue-400'
                    }`}
                  >
                    {task.completed && <Check size={14} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-slate-800 break-words ${
                        task.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}
                      >
                        {task.priority}优先级
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDate(task.created_at)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(task.id)}
                    aria-label="删除任务"
                    className="flex-shrink-0 w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
