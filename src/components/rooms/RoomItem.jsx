import React from 'react';
import TimeAgo from 'timeago-react';
const RoomItem = ({ room }) => {
  const { name, createdAt } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear capitalize">{name}</h4>
        <span className="font-normal text-black-45">
          {<TimeAgo datetime={new Date(createdAt)} />}
        </span>
      </div>
      <div className="d-flex align-items-center text-slate-900 opacity-75">
        <span>No messages yet </span>
      </div>
    </div>
  );
};
export default RoomItem;
