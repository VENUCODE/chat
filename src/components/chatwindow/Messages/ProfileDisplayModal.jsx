import React from 'react';
import ProfileAvatar from '../../ProfileAvatar';
import { useModalState } from '../../../misc/customhook';
import { Button, Divider, Modal } from 'rsuite';
const ProfileDisplayModal = ({ author }) => {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <div>
        {' '}
        <ProfileAvatar
          src={author.avatar}
          className="ml-1 height-200 cursor-pointer"
          name={author.name}
          size="sm"
          onClick={open}
        />
      </div>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header></Modal.Header>
        {/* <Modal.Body className="h-100 overflow-hidden"> */}

        <div class="relative flex w-96 flex-col rounded-xl  bg-clip-border mx-auto text-gray-700 shadow-md">
          <div class="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg ">
            <img src={author.avatar} alt="profile" className="h-100 w-100" />
          </div>
          <div class="p-6 text-center">
            <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {author.name}
            </h4>
            <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
              Member since <Divider vertical />
              {new Date(author.createdAt).toDateString()}
            </p>
          </div>
        </div>
        {/* </Modal.Body> */}
      </Modal>
    </>
  );
};

export default ProfileDisplayModal;
