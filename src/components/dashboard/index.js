import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newdata => {
    console.log(newdata);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3> Hey , {profile.username}</h3>
        <EditableInput
          intialValue={profile.username}
          label={'Nickname'}
          placeholder="nick name of yours"
          onSave={onSave}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          <Icon icon={'sign-out'} /> Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
