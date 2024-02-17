import React, { useEffect, useRef, useState } from 'react';
import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtn from './CreateRoomBtn';
import { Divider } from 'rsuite';
import ChatRoomlList from './rooms/ChatRoomlList';

const Sidebar = () => {
  const [height, setHeight] = useState(0);
  const TopsideRef = useRef();
  useEffect(() => {
    if (TopsideRef.current) {
      setHeight(TopsideRef.current.scrollHeight);
    }
  }, [TopsideRef]);
  return (
    <div style={{ backgroundColor: 'rgba(0,20,255,0.09)' }}>
      <div ref={TopsideRef}>
        <div
          className="flex justify-between align-items-center pt-2 pb-2 "
          style={{ backgroundColor: 'white' }}
        >
          <DashboardToggle />
          <CreateRoomBtn />
        </div>
      </div>
      <Divider>Join conversation</Divider>
      <ChatRoomlList aboveElementHeight={height} />
    </div>
  );
};

export default Sidebar;
