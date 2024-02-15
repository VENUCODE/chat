import React from 'react';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div className="pt-2">
      <div>
        <DashboardToggle />
      </div>
      Bottom
    </div>
  );
};

export default Sidebar;
