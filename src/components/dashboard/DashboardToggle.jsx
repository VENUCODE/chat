import React, { useCallback } from 'react';
import { Button, Drawer, Icon, Alert } from 'rsuite';
import { useModalState, useMediaQuery } from '../../misc/customhook';
import Dashboard from '.';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    close();
    Alert.info('Signed out', 4000);
  }, [close]);
  return (
    <>
      <Button color="blue" block onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
