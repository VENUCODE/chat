import React, { useEffect } from 'react';
import { Loader, Nav } from 'rsuite';
import RoomItem from './RoomItem';
import { useRooms } from '../../context/rooms.context';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ChatRoomlList = ({ aboveElementHeight }) => {
  const rooms = useRooms();
  const location = useLocation();

  // Function to compare room items based on the last message's author's creation time
  const compareRoomsByLastMessageTime = (roomA, roomB) => {
    if (!roomA.lastMessage || !roomB.lastMessage) return 0; // Handle cases where lastMessage is not available
    return (
      new Date(roomB.lastMessage.author.createdAt) -
      new Date(roomA.lastMessage.author.createdAt)
    );
  };

  // Sort the rooms array based on last message time
  const sortedRooms = rooms
    ? rooms.slice().sort(compareRoomsByLastMessageTime)
    : [];

  return (
    <div>
      <Nav
        appearance="subtle"
        className="overflow-y-scroll custom-scroll"
        vertical
        reversed
        style={{ height: `calc(100% - ${aboveElementHeight}px)` }}
        activeKey={location.pathname}
      >
        {!rooms && (
          <Loader center vertical content="Loading..." speed="fast" size="md" />
        )}
        {sortedRooms.map(room => (
          <Nav.Item
            key={room.id}
            state={{ fromNav: true }}
            componentClass={Link}
            to={`/chat/${room.id}`}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default ChatRoomlList;
