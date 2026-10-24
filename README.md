# Task Manager - 智能任务管理应用

一个基于 React + NestJS 的全栈任务管理应用，后端数据存储使用 Supabase。

## 功能特性

- 添加任务（标题 + 优先级：高/中/低）
- 任务列表展示（标题、优先级、完成状态、创建时间）
- 完成/未完成状态切换（已完成任务显示删除线）
- 删除任务
- 按优先级筛选
- 按创建时间倒序排列

## 技术栈

### 前端
- React 19 + TypeScript
- Tailwind CSS
- React Router DOM v6
- shadcn/ui 组件
- Lucide React 图标

### 后端
- NestJS 10 + TypeScript
- @supabase/supabase-js（通过 Supabase REST API 访问数据）

### 数据库
- Supabase PostgreSQL

## 项目结构

```
├── client/          # React 前端
│   └── src/
│       ├── pages/   # 页面组件
│       ├── api/     # API 调用封装
│       └── ...
├── server/          # NestJS 后端
│   ├── modules/
│   │   └── tasks/   # 任务模块
│   └── common/
│       └── supabase.ts  # Supabase 客户端配置
├── shared/          # 前后端共享类型
│   └── api.interface.ts
└── package.json     # 根配置
```

## Supabase 表结构

```sql
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('高', '中', '低')),
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/tasks` | 获取任务列表，支持 `?priority=高` 筛选 |
| POST | `/api/tasks` | 创建任务 |
| PATCH | `/api/tasks/:id` | 更新任务（支持部分字段） |
| DELETE | `/api/tasks/:id` | 删除任务 |
