import React, { useState } from 'react';
import { Alert, Button, Drawer, Icon, Divider } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { update, ref } from 'firebase/database';
import { database } from '../../misc/firebase';
import UploadAvatarBtn from './UploadAvatarBtn';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helper';
const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const [editable, setEditable] = useState(false);
  const onSave = async newdata => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newdata,
        database
      );
      console.log({ 'update from name': updates });
      await update(ref(database), updates);
      Alert.success(`NickName updated`, 4000);
    } catch (error) {
      console.log(error);
      Alert.error(error.message);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <div className="d-flex  flex-row justify-between align-middle  gap-2">
          <div className="img-fullsize d-flex ">
            <ProfileAvatar src={profile.avatar} name={profile.name} />
            <UploadAvatarBtn />
          </div>
          <div className="flex-1 gap-3 align-middle relative pt-16 text-center">
            <h3 className="font-res "> Hey , {profile.name}</h3>
            <span
              onClick={() => {
                setEditable(p => !p);
              }}
              className=" flex absolute top-8 right-0 text-slate-590 h-[1.5rem] p-1 ml-1 cursor-pointer rounded-md focus:bg-slate-200 hover:bg-slate-800"
            >
              <Icon icon={'edit2'} />
              Edit
            </span>
            <div className="text-center mt-2">
              <p>
                created On
                <Divider vertical />
                {new Date(profile.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>
        <Divider>Profile</Divider>
        {editable && (
          <EditableInput
            intialValue={profile.name}
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
