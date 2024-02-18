import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { auth, database } from '../../../misc/firebase';
import { Button } from 'rsuite';
import {
  ref,
  runTransaction,
  off,
  onValue,
  query,
  orderByChild,
  limitToLast,
  equalTo,
  update,
} from 'firebase/database';
import { transformToArrWithId, groupBy } from '../../../misc/helper';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';
const PAGE_SIZE = 15;
const messagesRef = ref(database, '/messages');
const Messages = () => {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef();

  function shouldScrollToBottom(node, threshold = 30) {
    const percentage =
      (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;

    return percentage > threshold;
  }
  const loadMessages = useCallback(
    limitToUse => {
      const node = selfRef.current;

      off(messagesRef);

      onValue(
        query(
          messagesRef,
          orderByChild('roomId'),
          equalTo(chatId),
          limitToLast(limitToUse || PAGE_SIZE)
        ),
        snap => {
          const data = transformToArrWithId(snap.val());
          setMessages(data);

          if (shouldScrollToBottom(node)) {
            node.scrollTop = node.scrollHeight;
          }
        }
      );

      setLimit(p => p + PAGE_SIZE);
    },
    [chatId]
  );

  const onLoadMore = useCallback(() => {
    const node = selfRef.current;
    const oldHeight = node.scrollHeight;

    loadMessages(limit);

    setTimeout(() => {
      const newHeight = node.scrollHeight;
      node.scrollTop = newHeight - oldHeight;
    }, 200);
  }, [loadMessages, limit]);

  useEffect(() => {
    const node = selfRef.current;

    loadMessages();

    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 200);

    return () => {
      off(messagesRef);
    };
  }, [loadMessages]);
  useEffect(() => {
    setIsLoading(true);

    const messageRef = ref(database, 'messages');
    const queryRef = query(messageRef, orderByChild('roomId'), equalTo(chatId));

    const handleData = snap => {
      const data = transformToArrWithId(snap.val());
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

  //SECTION - function to handle the like functinality
  const handleLike = useCallback(async messageId => {
    const dbRef = ref(database, `/messages/${messageId}`);
    const { uid } = auth.currentUser;
    try {
      await runTransaction(dbRef, msg => {
        if (msg) {
          if (msg.likes && msg.likes[uid]) {
            msg.likeCount -= 1;
            msg.likes[uid] = null;
          } else {
            msg.likeCount += 1;
            if (!msg.like) {
              msg.likes = {};
            }
            msg.likes[uid] = true;
          }
        }

        return msg;
      });
    } catch (error) {
      Alert.error(error.message, 2000);
    }
  }, []);

  const handleDelete = useCallback(
    async msgId => {
      // eslint-disable-next-line no-alert
      // if (!window.confirm('Delete this message?')) {
      //   return;
      // }

      const isLast = messages[messages.length - 1].id === msgId;

      const updates = {};
      //this will delete the message
      updates[`/messages/${msgId}`] = null;
      //last message which will make the room empty
      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await update(ref(database), updates);

        Alert.info('Message has been deleted');
      } catch (err) {
        return Alert.error(err.message);
      }
    },
    [chatId, messages]
  );
  const renderMessages = () => {
    const groups = groupBy(messages, item =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];

    Object.keys(groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1 padded">
          {date}
        </li>
      );

      const msgs = groups[date].map(msg => (
        <MessageItem
          key={msg.id}
          message={msg}
          handleAdmin={handleAdmin}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ));

      items.push(...msgs);
    });

    return items;
  };

  return (
    <ul ref={selfRef} className="msg-list custom-scroll flex-1 align-items-end">
      {messages && messages.length >= PAGE_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onLoadMore} color="green">
            Load more
          </Button>
        </li>
      )}
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
