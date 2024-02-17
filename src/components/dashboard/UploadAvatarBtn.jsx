import React, { useRef, useState } from 'react';
import { useModalState } from '../../misc/customhook';
import { Alert, Button, Icon, Modal, Loader } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { storage, database } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import { update, ref } from 'firebase/database';
import { getUserUpdates } from '../../misc/helper';

import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from 'firebase/storage';
const UploadAvatarBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  //NOTE - using the useRef hook to reference the canvas element
  const AvatarEditorRef = useRef();

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

  //!SECTIONT: conversion of the canvas to blob by converting the callback to promise
  const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      //ANCHOR - Callback to convert to blob
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('File process error');
        }
      });
    });
  };

  //NOTE - handling the click to store the image data to storage
  const handleUploadClick = async () => {
    setIsLoading(true);
    const canvas = AvatarEditorRef.current.getImageScaledToCanvas();
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storageRef(
        storage,
        `/profiles/${profile.uid}/avatar`
      );

      await uploadBytes(avatarFileRef, blob, {
        cacheControl: `public, max-age=${3600 * 24}`,
      });

      const downloadUrl = await getDownloadURL(avatarFileRef);
      if (downloadUrl) {
        const updates = await getUserUpdates(
          profile.uid,
          'avatar',
          downloadUrl,
          database
        );
        await update(ref(database), updates);
        console.log({ 'update from avatar': update });

        close();
        Alert.info('Avatar has been updated');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      Alert.warning(error.message, 2000);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button>
        <label class="tracking-wide uppercase  cursor-pointer  d-grid text-white rounded-full h-[20px] w-[20px]  ">
          <Icon icon={'camera'} className="text-gray-900" size="md" />
          <input
            type="file"
            class="hidden"
            accept={fileInputTypes}
            onChange={handleFileChange}
          />
        </label>
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title className="text-center">Upload new Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && (
            <Loader
              speed="slow"
              content="Loading.."
              vertical
              center
              size="md"
              backdrop
            />
          )}
          {image && (
            <div className="d-flex justify-content-center align-center">
              <AvatarEditor
                ref={AvatarEditorRef}
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
          <Button color="red" onClick={handleUploadClick}>
            <Icon icon={'upload'} />
            Upload Avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadAvatarBtn;
