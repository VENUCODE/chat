import React, { useCallback } from 'react';
import { Drawer, Icon, Alert } from 'rsuite';
import { useModalState, useMediaQuery } from '../../misc/customhook';
import Dashboard from '.';
import { auth } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';
import { useProfile } from '../../context/profile.context';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    close();
    Alert.info('Signed out', 4000);
  }, [close]);
  return (
    <>
      <span onClick={open} className="w-1/4 cursor-pointer">
        <span
          className="flex
         align-items-center"
        >
          <ProfileAvatar
            name={profile.name}
            src={profile.avatar}
            size="2x"
            className="img-fullsize"
          />
          <Icon
            icon="info"
            size="x"
            className="relative text-violet-900"
            style={{ bottom: '-10px' }}
          />
        </span>
      </span>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
