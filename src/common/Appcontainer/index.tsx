import React from 'react';
import { Outlet  } from 'react-router-dom';
import Menu from '@/common/Menu';
const AppContainer = () => {
  return (
    <div>
      <h1>Main Application test</h1>
      <Menu />
      <Outlet />
    </div>
  );
};

export default AppContainer;