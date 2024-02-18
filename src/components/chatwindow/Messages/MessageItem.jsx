import { memo } from 'react';
import ProfileDisplayModal from './ProfileDisplayModal';
import PresenceDot from '../../PresenceDot';
import { useProfile } from '../../../context/profile.context';
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import IconBtnControl from './IconBtnControl';
import { useHover, useMediaQuery } from '../../../misc/customhook';
//!SECTION END OF IMPORTS
//SECTION - START OF MessageItem component
const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, likes, likeCount } = message;
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width: 992px)');
  const [selfRef, isHovered] = useHover();
  const canShowIcons = isMobile || isHovered;
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantPermission = isAdmin && !isAuthor;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  const dateFormated = createdAt => {
    return new Date(createdAt).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  return author.uid === profile.uid ? (
    //Outgoing message
    <li className="padded ml-2" ref={selfRef}>
      <div className="flex mb-4 cursor-pointer justify-end">
        <p className=" flex gap-2 flex-row-reverse align-items-center mr-2">
          {canShowIcons && (
            <>
              <IconBtnControl
                {...(true ? { color: 'red' } : {})}
                isVisible={true}
                iconName="trash"
                onLike={() => handleDelete(message.id)}
                tooltip={`Delete this message`}
              />
              <IconBtnControl
                {...(true ? { color: 'green' } : {})}
                isVisible={true}
                iconName="heart"
                tooltip={`${likeCount} Likes`}
                badgeContent={likeCount}
              />{' '}
            </>
          )}
          <span
            className="mr-1 ml-1 font-mono font-thin  text-slate-900"
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
    //SECTION -Incoming messages
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
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
          <span
            className="ml-1 mr-1 font-mono font-thin  text-slate-900"
            style={{ fontSize: '10px', right: '0' }}
          >
            {dateFormated(createdAt)}
          </span>
          <IconBtnControl
            {...(isLiked ? { color: 'red' } : {})}
            isVisible={canShowIcons}
            iconName="heart"
            tooltip={isLiked ? 'Liked message' : 'Like this message'}
            onLike={() => handleLike(message.id)}
            badgeContent={likeCount}
          />
        </p>
      </div>
    </li>
  );
};

export default memo(MessageItem);
