import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileDisplayModal from './ProfileDisplayModal';
import { Icon } from 'rsuite';
import { auth } from '../../../misc/firebase';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;
  return (
    <li className="padded ml-2 ">
      {/* <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileDisplayModal author={author} />
        <span className="ml-2">{author.name}</span>
        <span className="ml-2">
          <TimeAgo
            datetime={new Date(createdAt)}
            className="font-normal text-black-45"
          />
        </span>
      </div>
      <div>
        {' '}
        <span className="word-break-all text-black font-bold">{text}</span>
      </div> */}
      <div class="flex mb-4 cursor-pointer">
        <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <ProfileDisplayModal
            className="w-8 h-8 rounded-full"
            author={author}
          />
        </div>
        <div class="flex max-w-96 bg-white rounded p-3 gap-3">
          <p class="text-gray-700">{text}</p>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
