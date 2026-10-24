import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TaskPage from './pages/TaskPage/TaskPage';

import Layout from './components/Layout';
import NotFound from './pages/NotFound/NotFound';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<TaskPage />} />
        <Route path="tasks" element={<TaskPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
