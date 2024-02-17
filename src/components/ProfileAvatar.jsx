import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../misc/helper';

const ProfileAvatar = ({ name, ...props }) => {
  return (
    <div>
      <Avatar {...props} circle>
        {getNameInitials(name)}
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
