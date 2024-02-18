import React, { useState } from 'react';
import ProfileDisplayModal from './ProfileDisplayModal';
import PresenceDot from '../../PresenceDot';
import { useProfile } from '../../../context/profile.context';
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import IconBtnControl from './IconBtnControl';
const dateFormated = createdAt => {
  return new Date(createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
const MessageItem = ({ message, handleAdmin }) => {
  const { author, createdAt, text } = message;
  const { profile } = useProfile();
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantPermission = isAdmin && !isAuthor;

  return author.uid === profile.uid ? (
    <li className="padded ml-2">
      <div className="flex mb-4 cursor-pointer justify-end">
        <p>
          <span
            className="mr-1 font-mono font-thin  text-slate-900"
            style={{ fontSize: '10px', right: '0' }}
          >
            {dateFormated(createdAt)}
          </span>
        </p>
        <div className="flex max-w-96 bg-fuchsia-500 rounded p-3 gap-3 relative">
          <p className="text-slate-50">{text}</p>
        </div>
      </div>
    </li>
  ) : (
    <li className="padded ml-2 ">
      <div className="flex mb-4 cursor-pointer">
        <div className="d-flex align-items-center font-bolder mb-1 mr-1">
          <PresenceDot uid={author.uid} />
          <ProfileDisplayModal author={author}>
            {canGrantPermission && (
              <Button
                style={{
                  backgroundColor: !isMsgAuthorAdmin
                    ? 'rgb(134 ,239, 172)'
                    : 'rgb(244, 63 ,94)',
                }}
                block
                onClick={() => {
                  handleAdmin(author.uid);
                }}
              >
                {isMsgAuthorAdmin
                  ? 'Remove Admin Permission'
                  : 'Give Admin permission'}
              </Button>
            )}
          </ProfileDisplayModal>
        </div>
        <div className="flex max-w-96 bg-violet-700  rounded p-3 gap-3 relative">
          <p className="text-slate-50">{text}</p>
        </div>
        <p className=" flex gap-2 flex-row-reverse align-items-center">
          <IconBtnControl
            {...(true ? { color: 'red' } : {})}
            isVisible
            iconName="heart"
            tootip="Like this message"
            onClick={() => {}}
            badgeCount={5}
            className="text-red-400"
          />
          <span
            className="ml-1 font-mono font-thin  text-slate-900"
            style={{ fontSize: '10px', right: '0' }}
          >
            {dateFormated(createdAt)}
          </span>
        </p>
      </div>
    </li>
  );
};

export default MessageItem;
