import React from 'react'
import notfound from '/404.gif';

const NotFound = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-black flex justify-center items-center relative">
      <img src={notfound} alt="" />
    </div>
  );
}

export default NotFound