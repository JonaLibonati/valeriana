import React from 'react';
import { Outlet } from 'react-router-dom';

export const WelcomeDashboard = () => {
  return (
    <div className="flex h-dvh">
      <div className="grow bg-rose-50"></div>
      <div className="w-[500px] m-8">
        <Outlet />
      </div>
    </div>
  )
}
