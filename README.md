# Task Manager - 智能任务管理

一个基于 React + Vite 的纯前端任务管理应用，直接通过 Supabase REST API 操作数据库。

## 功能特性

- 添加任务（标题 + 优先级：高/中/低）
- 任务列表展示（标题、优先级、完成状态、创建时间）
- 完成/未完成状态切换（已完成任务显示删除线）
- 删除任务
- 按优先级筛选（全部/高/中/低）
- 按创建时间倒序排列

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- @supabase/supabase-js（浏览器直连 Supabase）
- React Router DOM
- Sonner（消息提示）

## 项目结构

```
├── client/          # React 前端
│   └── src/
│       ├── pages/   # 页面组件
│       ├── api/     # Supabase 数据访问层
│       ├── lib/      # Supabase 客户端配置
│       └── components/
├── shared/          # 共享类型定义
│   └── api.interface.ts
├── vercel.json      # Vercel 部署配置
└── package.json
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
npm install
npm run dev
```

## 构建部署

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

Vercel 自动部署，无需额外配置。
