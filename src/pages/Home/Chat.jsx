import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Top from '../../components/chatwindow/Top';
import Messages from '../../components/chatwindow/Messages';
import Bottom from '../../components/chatwindow/Bottom';
import { useRooms } from '../../context/rooms.context';
import { Loader } from 'rsuite';
import { Planet } from 'react-kawaii';
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
        <div className="bg-teal-300">
          {' '}
          <Planet size="100" mood="sad" color="orange" />
        </div>
        <h6>Chat {chatId} not found</h6>
      </div>
    );
  }

  return (
    <div>
      {/* //SECTION - top */}
      <div className="chat-top">
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
  );
};

export default Chat;
