import React from 'react'
import Loader from '/loader.gif';

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-primary flex justify-center items-center relative'>
      <img src={Loader}  alt="" />
      <div className='w-[10%] h-[7%] bg-primary absolute right-[35%] top-[69%]'></div>
    </div>
  );
}

export default Loading