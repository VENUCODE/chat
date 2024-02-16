import React from 'react';
import { Backpack } from 'react-kawaii';
const FourOfour = () => {
  return (
    <>
      <section class="bg-white dark:bg-sky-200 h-100 d-flex jusfify-center text-center  flex-col pt-10">
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl uppercase ">
          Select a Chat
        </h1>
        <div class="mt-2 mx-auto">
          <Backpack size={320} mood="blissful" color="#FFD882" />
        </div>
      </section>
    </>
  );
};

export default FourOfour;
