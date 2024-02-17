import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
} from 'firebase/database';
import { transformToArrayWithId } from '../../../misc/helper';
import MessageItem from './MessageItem';
import { Loader } from 'rsuite';
const Messages = () => {
  const [messages, setMessages] = useState();
  const [iseLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const isChatEmpy = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  useEffect(() => {
    setIsLoading(true);
    onValue(
      query(ref(database, 'messages'), orderByChild('roomId'), equalTo(chatId)),
      snap => {
        const data = transformToArrayWithId(snap.val());
        setMessages(data);
      }
    );
    setIsLoading(false);
    return () => {
      setIsLoading(false);
      off(ref(database, '/messages'));
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpy && <li> No messages yet</li>}
      {iseLoading && (
        <Loader vertical center content="loading chat" speed="slow" />
      )}
      {canShowMessages &&
        messages.map(msg => <MessageItem key={msg.id} message={msg} />)}
    </ul>
  );
};

export default Messages;
