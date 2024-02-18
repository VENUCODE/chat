import React, { useEffect, useState, memo } from 'react';
import { Button, Drawer, Icon, Alert } from 'rsuite';
import { useMediaQuery, useModalState } from '../../../misc/customhook';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current-room.context';
import { ref, child, set } from 'firebase/database';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const [editable, setEditable] = useState(isOpen);
  const { chatId } = useParams();
  const name = useCurrentRoom(v => v.name);

  const description = useCurrentRoom(v => v.description);
  const isMobile = useMediaQuery('(max-width:992px)');
  const updateData = async (key, value) => {
    const dbref = ref(database, `rooms/${chatId}`);
    try {
      set(child(dbref, key), value).then(
        Alert.success(`Room ${key} changed `, 2000)
      );
      close();
    } catch (error) {
      Alert.error(error.message, 4000);
      close();
    }
  };
  const updateName = name => {
    updateData('name', name);
  };
  const updateDescription = description => {
    updateData('description', description);
  };

  return (
    <div>
      <Button
        size="x"
        style={{ backgroundColor: 'indigo', color: 'white' }}
        onClick={open}
      >
        <Icon icon={'gear'} />
      </Button>
      <Drawer
        size={isMobile ? 'full' : 'sm'}
        show={isOpen}
        onHide={close}
        placement="right"
      >
        <Drawer.Header>
          <Drawer.Title>
            Edit Room Info <Icon icon={'gear'} spin={isOpen} />
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            intialValue={name}
            label="Room name"
            emptyMsg="input is empty"
            editable={editable}
            setEditable={setEditable}
            placeholder="Write your value"
            onSave={updateName}
          />
          <EditableInput
            intialValue={description}
            label="Description name"
            emptyMsg="input is empty"
            placeholder="Write your value"
            onSave={updateDescription}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button>
            <Icon icon="close" /> Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
