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
    <div className="pt-2">
      <div ref={TopsideRef}>
        <DashboardToggle />
        <CreateRoomBtn />
        <Divider>Join conversation</Divider>
      </div>
      <ChatRoomlList aboveElementHeight={height} />
    </div>
  );
};

export default Sidebar;
