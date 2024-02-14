import React from 'react';
import { Loader } from 'rsuite';
const Loading = () => {
  return (
    <Loader
      speed="slow"
      content="Loading.."
      vertical
      center
      size="md"
      backdrop
    />
  );
};

export default Loading;
