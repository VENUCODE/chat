import React, { useCallback, useState } from 'react';
import { Input, InputGroup, Button, Icon, Alert } from 'rsuite';
import { push, ref, serverTimestamp, update, child } from 'firebase/database';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
function AssembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    likeCount: 0,
    createdAt: serverTimestamp(),
  };
}

//structure of the data is to be maintained as flat as possible without nested documents
//so for that we create a new document section similar to profile,rooms i.e message
//then message file has chatMessage which has properties like roomId,author_details,avatar,message
//the main purpose of duplicate data in Nosql databases is to prevent multiple requests to the database i.e denormalization of data

const Bottom = () => {
  const [input, setInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChangeHandler = useCallback(value => {
    setInput(value);
  }, []);
  const onSendClick = async () => {
    setIsLoading(true);

    if (input.trim() === '') {
      setIsLoading(false);
      return Alert.info("Message can't be empty", 1000);
    }
    //we are going to need a handler function which will arrange the message (file,audio,text)
    const messageData = AssembleMessage(profile, chatId);
    messageData.text = input;
    const updates = {};
    const messageId = push(child(ref(database), 'messages')).key;
    updates[`/messages/${messageId}`] = messageData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...messageData,
      msgId: messageId,
    };
    try {
      await update(ref(database), updates);
      setInput('');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 3000);
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          value={input}
          onChange={onInputChangeHandler}
          onPressEnter={onSendClick}
          placeholder="write your message...."
        />
        <InputGroup.Button>
          <Button onClick={onSendClick} disabled={isLoading}>
            <Icon icon={'send'} />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
