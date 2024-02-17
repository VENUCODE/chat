import React from 'react';
import ProfileDisplayModal from './ProfileDisplayModal';
import TimeAgo from 'timeago-react';
import PresenceDot from '../../PresenceDot';
import { useProfile } from '../../../context/profile.context';
const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;
  const { profile } = useProfile();
  return author.uid === profile.uid ? (
    <li className="padded ml-2">
      <div class="flex mb-4 cursor-pointer justify-end">
        <p>
          <TimeAgo
            datetime={new Date(createdAt)}
            className="mr-1 font-mono font-thin  text-slate-900"
            style={{ fontSize: '10px', right: '0' }}
          />
        </p>
        <div class="flex max-w-96 bg-fuchsia-500 rounded p-3 gap-3 relative">
          <p class="text-slate-50">{text}</p>
        </div>
      </div>
    </li>
  ) : (
    <li className="padded ml-2 ">
      <div class="flex mb-4 cursor-pointer">
        <div class="d-flex align-items-center font-bolder mb-1 mr-1">
          <PresenceDot uid={author.uid} />
          <ProfileDisplayModal
            className="w-8 h-8 rounded-full"
            author={author}
          />
        </div>
        <div class="flex max-w-96 bg-violet-700  rounded p-3 gap-3 relative">
          <p class="text-slate-50">{text}</p>
        </div>
        <p>
          <TimeAgo
            datetime={new Date(createdAt)}
            className="ml-1 font-mono font-thin  text-slate-900"
            style={{ fontSize: '10px', right: '0' }}
          />
        </p>
      </div>
    </li>
  );
};

export default MessageItem;
