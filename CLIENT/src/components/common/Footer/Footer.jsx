import React from "react";
import Logo2 from "../../../assets/Images/logo2.png"

const Footer = () => {
  return (
    <div className="flex justify-center p-2">
    <div className=" fixed p-2  z-[9999] border-t-[2px] border-t-richblack-700 shadow-lg rounded-lg  bg-slate-200 bottom-0 w-full ">
      <div className=" flex justify-between items-center">
        {/* left side */}
        <div className=" flex flex-col justify-center items-center gap-4">
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Real</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
          <span className="text-slate-600">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        {/* right side */}
        <div className="flex flex-col items-start">
          <span className=" text-blue-400 text-3xl font-semibold">Information</span>
          <span className="text-richblack-500">181133,JAMMU, INDIA</span>
          <div className="flex gap-6 mt-4">
            <span className="text-black font-semibold">Property</span>
            <span className="text-black font-semibold">Services</span>
            <span className="text-black font-semibold">Product</span>
            <span className="text-black font-semibold">About Us</span>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Footer;
