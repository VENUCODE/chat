import React, { useState } from 'react';
import { useModalState } from '../../misc/customhook';
import { Alert, Button, Icon, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
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

      if (validFile(file.type)) {
        setImage(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 3000);
      }
    }
  };
  return (
    <div className="mt-8 ">
      <label htmlFor="avatar-upload" className=" relative cursor-pointer ">
        Select new avatar
        <input
          type="file"
          className="cursor-pointer"
          accept={fileInputTypes}
          onChange={handleFileChange}
        />
      </label>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title className="text-center">Upload new Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <div className="d-flex justify-content-center align-center">
              <AvatarEditor
                image={image}
                width={200}
                height={200}
                border={10}
                scale={1}
                borderRadius={100}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button color="red" >
            <Icon icon={'upload'} />
            Upload Avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadAvatarBtn;
