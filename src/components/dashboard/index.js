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
      <Drawer.Header></Drawer.Header>

      <Divider>Profile</Divider>
      <Drawer.Body
        className="realtive "
        style={{
          backgroundImage: `url(${profile.avatar ? profile.avatar : 'linearGradient(45deg,blue,white)'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backdropFilter: 'blur(10px)',
          borderRadius: '2rem',
          backgroundColor: 'gray',
          backgroundBlendMode: 'screen',
        }}
      >
        <div class=" realtive  h-full w-full flex justify-center  items-start py-3  ">
          <div class="h-56 w-72 absolute flex justify-center items-center">
            <ProfileAvatar
              class="object-cover h-20 w-20 rounded-full"
              src={profile.avatar}
              name={profile.name}
              size="lg"
            />
          </div>

          <div
            class="
          h-56
          mx-4
          w-5/6
          rounded-3xl
          shadow-md
          sm:w-80 sm:mx-0
        "
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <div class="h-3/4 w-full flex justify-between items-baseline px-3 py-5">
              <h5 class="text-white font-normal">Profile</h5>
              <Button onClick={onSignOut}>
                <Icon icon={'sign-out'} className="text-red" />
              </Button>
            </div>

            <div
              class="
            bg-white
            h-1/8
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center
          "
            >
              <div class="w-full h-1/3 flex justify-between items-center px-3 pt-2">
                <div class="flex flex-col justify-center items-center">
                  <UploadAvatarBtn />
                  Upload
                </div>
                <div class="flex flex-col justify-center items-center">
                  <Button
                    class="flex flex-col justify-center items-center cursor-pointer"
                    appearance="subtle"
                    onClick={() => {
                      setEditable(p => !p);
                    }}
                  >
                    <Icon
                      icon={'edit2'}
                      className="cursor-pointer text-slate-900"
                    />
                  </Button>
                  Edit
                </div>
              </div>
              <div class="w-full h-1/2 flex flex-col justify-center items-center">
                <h5 class="text-gray-700 font-bold capitalize pb-1">
                  {' '}
                  {profile.name}
                </h5>
              </div>
              <div>
                {' '}
                {editable && (
                  <EditableInput
                    intialValue={profile.name}
                    placeholder="nick name of yours"
                    onSave={onSave}
                    setEditable={setEditable}
                    editable={editable}
                  />
                )}
              </div>
              <div className="pb-2 pt-2">
                <h6 class="text-gray-500 text-sm">
                  Created on <Divider vertical />{' '}
                  {new Date(profile.createdAt).toDateString()}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Drawer.Body>

      <Drawer.Footer></Drawer.Footer>
    </>
  );
};

export default Dashboard;
