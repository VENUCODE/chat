import React from 'react';
import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtn from './CreateRoomBtn';

const Sidebar = () => {
  return (
    <div className="pt-2">
      <div>
        <DashboardToggle />
        <CreateRoomBtn />
      </div>
      Bottom
    </div>
  );
};

export default Sidebar;
