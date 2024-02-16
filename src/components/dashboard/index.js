import React, { useState } from 'react';
import { Alert, Badge, Button, Drawer, Avatar, Icon, Divider } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { child, ref, set } from 'firebase/database';
import { database } from '../../misc/firebase';
import UploadAvatarBtn from './UploadAvatarBtn';
import ProfileAvatar from '../ProfileAvatar';
const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const [editable, setEditable] = useState(false);
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
        <div className="d-flex  flex-row justify-between align-middle  gap-2">
          <div className="img-fullsize d-flex ">
            <ProfileAvatar src={profile.avatar} name={profile.username} />
            <UploadAvatarBtn />
          </div>
          <div className="flex-1 gap-3 align-middle relative pt-16 text-center">
            <h3 className="font-res capitalize"> Hey , {profile.username}</h3>
            <span
              onClick={() => {
                setEditable(p => !p);
              }}
              className=" flex absolute top-8 right-0 text-slate-590 h-[1.5rem] p-1 ml-1 cursor-pointer rounded-md focus:bg-slate-200 hover:bg-slate-800"
            >
              <Icon icon={'edit2'} />
              Edit
            </span>
          </div>
        </div>
        <Divider>Profile</Divider>
        {editable && (
          <EditableInput
            intialValue={profile.username}
            label={'Nickname'}
            placeholder="nick name of yours"
            onSave={onSave}
            setEditable={setEditable}
            editable={editable}
          />
        )}
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
