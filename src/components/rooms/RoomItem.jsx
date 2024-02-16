import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../ProfileAvatar';
import { useProfile } from '../../context/profile.context';
const RoomItem = ({ room }) => {
  const { name, createdAt, lastMessage } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear capitalize">{name}</h4>
        <span className="font-normal text-black-45">
          {
            <TimeAgo
              datetime={
                lastMessage
                  ? new Date(lastMessage.createdAt)
                  : new Date(createdAt)
              }
            />
          }
        </span>
      </div>
      <div className="d-flex align-items-center text-slate-900 opacity-75">
        <>
          {lastMessage ? (
            <div className="d-flex align-items-center">
              <ProfileAvatar
                name={lastMessage.author.name}
                src={lastMessage.author.avatar}
                size="sm"
              />
              <div className="text-disappear ml-2">
                <div className="italic fs-6">{lastMessage.author.name}</div>
                <span className="text-disappear">{lastMessage.text}</span>
              </div>
            </div>
          ) : (
            <span> No messages yet</span>
          )}
        </>
      </div>
    </div>
  );
};
export default RoomItem;
