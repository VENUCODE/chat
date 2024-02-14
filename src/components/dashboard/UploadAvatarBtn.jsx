import React, { useState } from 'react';
import { useModalState } from '../../misc/customhook';
import { Alert, Button, Icon, Modal } from 'rsuite';

const UploadAvatarBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);
  const fileInputTypes = '.png, .jpg, .jpeg';
  const acceptTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const validFile = file => {
    return acceptTypes.includes(file);
  };
  const handleFileChange = e => {
    const currentFile = e.target.files;
    if (currentFile.length === 1) {
      const file = currentFile[0];
      console.log(file);
      if (validFile(file.type)) {
        setImage(image);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 3000);
      }
    }
  };
  return (
    <div className="mt-8 ">
      <label htmlFor="avatar-upload" className=" relative cursor-pointer ">
        <h3>Select new avatar</h3>
        <input
          type="file"
          className=" d-none"
          accept={fileInputTypes}
          onChange={handleFileChange}
        />
      </label>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title> Upload new Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Image will appear here</Modal.Body>
        <Modal.Footer>
          <Button color="red" appearance="ghost">
            <Icon icon={'upload'} />
            Upload Avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadAvatarBtn;
