import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="text-6xl font-bold text-slate-300 mb-4">404</div>
      <p className="text-slate-500 mb-6">页面不存在</p>
      <Link to="/" className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;
