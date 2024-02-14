import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import useModalState from '../../misc/customhook';
import Dashboard from '.';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <Button color="blue" block onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
