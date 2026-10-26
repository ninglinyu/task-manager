import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

import RoutesComponent from './app';
import './index.css';

const MainApp = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div className="p-10 text-center text-slate-500">页面出错了，请刷新重试</div>}>
        <RoutesComponent />
        <Toaster position="top-center" />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
