import React from 'react';
import { Backpack } from 'react-kawaii';
const FourOfour = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900  d-flex jusfify-center text-center">
        <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div class="wf-ull lg:w-1/2">
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Select a Chat
            </h1>
          </div>

          <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0 text-center ">
            <Backpack size={320} mood="blissful" color="#FFD882" />
          </div>
        </div>
      </section>
    </>
  );
};

export default FourOfour;
