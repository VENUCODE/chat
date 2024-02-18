import React from 'react';
import { Loader, Nav } from 'rsuite';
import RoomItem from './RoomItem';
import { useRooms } from '../../context/rooms.context';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const ChatRoomlList = ({ aboveElementHeight }) => {
  const rooms = useRooms();
  const location = useLocation();

  return (
    <div>
      <Nav
        appearance="subtle"
        className="overflow-y-scroll custom-scroll "
        vertical
        reversed
        style={{ height: `calc(100% - ${aboveElementHeight}px)` }}
        activeKey={location.pathname}
      >
        {!rooms && (
          <Loader center vertical content="Loading..." speed="fast" size="md" />
        )}
        {rooms &&
          rooms.length > 0 &&
          rooms.map(room => {
            return (
              <Nav.Item
                key={room.id}
                state={{ fromNav: true }}
                componentClass={Link}
                to={`/chat/${room.id}`}
                eventKey={`/chat/${room.id}`}
              >
                <RoomItem room={room} />
              </Nav.Item>
            );
          })}
      </Nav>
    </div>
  );
};

export default ChatRoomlList;
