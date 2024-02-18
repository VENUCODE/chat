import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
  runTransaction,
} from 'firebase/database';
import { transformToArrayWithId } from '../../../misc/helper';
import MessageItem from './MessageItem';
import { Alert, Loader } from 'rsuite';
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

  //SECTION - handling permission management of the user

  const handleAdmin = useCallback(
    async uid => {
      let alertMsg;
      const dbRef = ref(database, `/rooms/${chatId}/admins`);
      try {
        await runTransaction(dbRef, admins => {
          if (admins) {
            if (admins[uid]) {
              admins[uid] = null;
              alertMsg = 'Admin permission revoked';
            } else {
              admins[uid] = true;
              alertMsg = 'Admin permission Granted';
            }
          }
          Alert.info(alertMsg, 4000);
          return admins;
        });
      } catch (error) {
        Alert.error(error.message, 40000);
      }
    },
    [chatId]
  );
  //!SECTION end of handle admin function
  return (
    <ul className="msg-list custom-scroll flex-1 align-items-end">
      {isLoading && isChatEmpy && <li> No messages yet</li>}
      {isLoading && (
        <Loader vertical center content="loading chat" speed="slow" />
      )}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} />
        ))}
    </ul>
  );
};

export default Messages;
