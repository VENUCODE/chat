import React, { useEffect, useRef, useState } from 'react';
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
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const isChatEmpy = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  useEffect(() => {
    setIsLoading(true);

    const messageRef = ref(database, 'messages');
    const queryRef = query(messageRef, orderByChild('roomId'), equalTo(chatId));

    const handleData = snap => {
      const data = transformToArrayWithId(snap.val());
      setMessages(data);
      setIsLoading(false);
    };

    const handleError = error => {
      console.error('Error fetching messages:', error);
      setIsLoading(false);
      // Handle error state if needed
    };

    onValue(queryRef, handleData, handleError);

    return () => {
      off(queryRef, handleData);
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isLoading && isChatEmpy && <li> No messages yet</li>}
      {isLoading && (
        <Loader vertical center content="loading chat" speed="slow" />
      )}
      {canShowMessages &&
        messages.map(msg => <MessageItem key={msg.id} message={msg} />)}
    </ul>
  );
};

export default Messages;
