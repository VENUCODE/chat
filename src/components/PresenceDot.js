import React from 'react';
import { Whisper, Button, Tooltip, Badge } from 'rsuite';
import { usePresence } from '../misc/customhook';
const getColor = presence => {
  if (!presence) {
    return `gray`;
  }
  switch (presence.state) {
    case 'online':
      return `green`;
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
};

const getText = presence => {
  if (!presence) return 'Unknown state';
  return presence.state === 'onilne'
    ? 'Online'
    : `Last seen ${new Date(presence.last_changed).toLocaleDateString()}`;
};
const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);
  return (
    <>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>{getText(presence)}</Tooltip>}
      >
        <Badge
          className="cursor-pointer "
          style={{
            background: getColor(presence),
            height: '10px',
            width: '10px',
            display: 'block',
            borderRadius: '5px',
          }}
        ></Badge>
      </Whisper>
    </>
  );
};

export default PresenceDot;
