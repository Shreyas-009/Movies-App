import React from 'react'
import Loader from "/loading.gif";

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-primary flex justify-center items-center relative">
      <img src={Loader} alt="" />
      <div className="w-[30%] h-[10%] absolute right-[2%] md:right-[17%] bg-primary top-[68%]"></div>
    </div>
  );
}

export default Loading