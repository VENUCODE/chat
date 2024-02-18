import React, { useCallback } from 'react';
import { Icon, Drawer, Alert } from 'rsuite';
import { ref, set } from 'firebase/database';
import { useModalState, useMediaQuery } from '../../misc/customhook';
import Dashboard from '.';
import { auth, database } from '../../misc/firebase';
import {
  isOfflineForDatabase,
  useProfile,
} from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';
const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    set(ref(database, `/status/${auth.currentUser.uid}`), isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info('Signed out', 4000);
        close();
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
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
            className="img-fullsize"
          />
          <Icon
            icon="gear"
            className="relative text-slate-50"
            style={{ bottom: '-10px' }}
          />
        </span>
      </span>

      <Drawer
        full={isMobile}
        show={isOpen}
        onHide={close}
        placement="left"
        style={{ backgroundColor: 'red' }}
      >
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
