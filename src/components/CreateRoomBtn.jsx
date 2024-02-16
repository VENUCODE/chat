import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Loader,
  Modal,
  Schema,
} from 'rsuite';
import { useModalState } from '../misc/customhook';
import { push, ref, serverTimestamp, set } from 'firebase/database';
import { database } from '../misc/firebase';
const INITIAL_FORM = {
  name: '',
  description: '',
};
const CreateRoomBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef();
  const openModal = () => {
    open();
  };
  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);
  const onSubmit = async () => {
    setIsLoading(true);
    if (!formRef.current.check()) {
      setIsLoading(false);
      return Alert.info('Form is invalid', 2000);
    }
    const newRoomData = {
      createdAt: serverTimestamp(),
      ...formValue,
    };
    try {
      const postListRef = ref(database, 'rooms');
      const newPostRef = push(postListRef);
      await set(newPostRef, newRoomData);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      Alert.info(`${newRoomData.name} is created`, 2000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 3000);
    }
  };
  //SECTION - Rsuite provides the method for validating the form usin the schema
  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Chat  name is required'),
    description: StringType().isRequired('Description name is required'),
  });

  return (
    <div className="m-1">
      <Button color="green" onClick={openModal}>
        <Icon icon={'creative'} />
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Create New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={formRef}
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
          >
            {' '}
            {isLoading && <Loader center />}
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl fluid name="name" placeholder="Enter room name" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Room Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                fluid
                name="description"
                placeholder="Enter room name"
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtn;
