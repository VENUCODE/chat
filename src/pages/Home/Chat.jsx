import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Top from '../../components/chatwindow/Top';
import Messages from '../../components/chatwindow/Messages';
import Bottom from '../../components/chatwindow/Bottom';
import { useRooms } from '../../context/rooms.context';
import { Loader } from 'rsuite';
import { Planet } from 'react-kawaii';
import { CurrentRoomProvider } from '../../context/current-room.context';
const Chat = () => {
  const { chatId } = useParams();
  //LINK - grabbing the current room data from the context
  const rooms = useRooms();
  if (!rooms) {
    return <Loader center vertical size="md" speed="slow" content="loading" />;
  }
  const currentRoom = rooms.find((room, index) => {
    return room.id === chatId;
  });
  if (!currentRoom) {
    return (
      <div className="mt-page  text-center  ">
        <div className="">
          {' '}
          <Planet size="100" mood="sad" color="orange" />
        </div>
        <h6>Chat {chatId} not found</h6>
      </div>
    );
  }
  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div style={{ backgroundColor: 'rgba(0,20,255,0.2)', margin: '0px' }}>
        {/* //SECTION - top */}
        <div
          className="chat-top  px-2"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <Top />
        </div>
        {/* //SECTION -messages */}
        <div className="chat-middle">
          <Messages />
        </div>

        {/* //SECTION -  bottom */}
        <div className="chat-bottom">
          <Bottom />
        </div>
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
