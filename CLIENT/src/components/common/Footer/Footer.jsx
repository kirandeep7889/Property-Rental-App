import React from "react";
import Logo2 from "../../../assets/Images/logo2.png"

const Footer = () => {
  return (
    <div className="flex justify-center">
    <div className="  z-[9999] border-t-[2px] border-t-richblack-700  bg-richblack-800 bottom-0 w-full ">
      <div className=" flex justify-between items-center">
        {/* left side */}
        <div className=" flex flex-col justify-center items-center gap-4">
          <img src={Logo2} alt="" className="mt-3" width={100} />
          <span className="text-richblack-500">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        {/* right side */}
        <div className="flex flex-col items-start">
          <span className=" text-blue-400 text-3xl font-semibold">Information</span>
          <span className="text-richblack-500">181133,JAMMU, INDIA</span>
          <div className="flex gap-6 mt-4">
            <span className="text-white font-semibold">Property</span>
            <span className="text-white font-semibold">Services</span>
            <span className="text-white font-semibold">Product</span>
            <span className="text-white font-semibold">About Us</span>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Footer;
