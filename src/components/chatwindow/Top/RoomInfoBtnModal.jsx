import React from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { Button, Divider, Icon, Modal } from 'rsuite';
import { useModalState } from '../../../misc/customhook';
import { memo } from 'react';

const RoomInfoBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);
  return (
    <div className="px-1 ">
      <Button onClick={open}>
        <Icon icon={'podcast'} className="mr-1 " />
        Info
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header className="text-center">
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Divider>Description about room</Divider>
          <h6 className="ml-2 capitalize text-disappear">{description}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>
            <Icon icon={'close'} /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(RoomInfoBtnModal);
