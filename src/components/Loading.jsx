import React from "react";
import Loader from "/loading.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center relative">
      <div
        className="w-full max-w-[200px] aspect-square relative
                      sm:max-w-[250px] 
                      md:max-w-[300px] 
                      lg:max-w-[350px] 
                      xl:max-w-[400px]
                      landscape:max-w-[25vh]"
      >
        <img
          src={Loader}
          alt="Loading"
          className="w-full h-full object-contain"
        />
        <div
          className="absolute right-0 bottom-0 w-1/3 h-1/10 bg-primary 
                        sm:w-3/4 sm:h-1/8
                        md:w-1/5 md:h-1/6
                        lg:w-1/6 lg:h-1/5
                        xl:w-1/7 xl:h-1/4
                        landscape:w-2/5 landscape:h-1/6"
        ></div>
      </div>
    </div>
  );
};

export default Loading;
