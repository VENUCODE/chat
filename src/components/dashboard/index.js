import React from 'react';
import { Alert, Avatar, Button, Drawer, Icon } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { child, ref, set } from 'firebase/database';
import { database } from '../../misc/firebase';
import UploadAvatarBtn from './UploadAvatarBtn';
import { getNameInitials } from '../../misc/helper';
const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newdata => {
    const userRef = ref(database, `/profiles/${profile.uid}`);
    const nickNameRef = child(userRef, 'username');
    try {
      await set(nickNameRef, newdata);
      Alert.success('NickName updated', 4000);
    } catch (error) {
      Alert.error(error.message);
    }
    // console.log(newdata)
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

        <div className="block text-center bg-lime-200">
          <UploadAvatarBtn />
        </div>
        <div className="d-flex relative justify-content-center padded img-fullsize ">
          {profile.avatar && (
            <Avatar src={profile.avatar} circle className="" />
          )}
          {!profile.avatar && (
            <Avatar circle size="lg">
              {getNameInitials(profile.username)}
            </Avatar>
          )}
        </div>
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
