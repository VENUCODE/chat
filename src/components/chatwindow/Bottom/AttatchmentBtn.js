import React, { useState } from 'react';
import { InputGroup, Icon, Modal, Uploader, Button, Alert } from 'rsuite';
import { useModalState } from '../../../misc/customhook';
import { storage } from '../../../misc/firebase';
import { useParams } from 'react-router';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
const MAX_FILE_SIZE = 1000 * 1024 * 5;
const AttatchmentBtn = ({ afterUpload }) => {
  const { isOpen, open, close } = useModalState();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();

  const onChange = fileArr => {
    const filtered = fileArr
      .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);

    setFileList(filtered);
  };
  const onUpload = async () => {
    try {
      const uploadPromises = fileList.map(f => {
        return uploadBytes(
          ref(storage, `/chat/${chatId}/${Date.now() + f.name}`),
          f.blobFile,
          {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          }
        );
      });

      const uploadSnapshots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapshots.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await getDownloadURL(snap.ref),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);

      setIsLoading(false);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message);
    }
  };
  return (
    <>
      <InputGroup.Button onClick={open} color="violet">
        <Icon icon="attachment" />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            className="w-100"
            autoUpload={false}
            action=""
            onChange={onChange}
            multiple
            listType="picture-text"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block disabled={isLoading} onClick={onUpload}>
            send to chat
          </Button>
          <div className="text-right mt-1">
            <small>{'only  files <= 5Mb are allowed'}</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttatchmentBtn;
