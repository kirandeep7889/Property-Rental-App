import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { login, signUp } from '../services/operations/authAPI';
import { ACCOUNT_TYPE } from '../utils/constants';
import { setSignupData } from '../slices/authSlice';


const Signup = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.BUYER);



    const onSubmit = (data) => {
        data.accountType = accountType;
        data.navigate=Navigate;
        dispatch(signUp(data));
    };


  return (
    <div className=' w-full h-[580px] flex flex-col justify-center  items-center mt-4'>
    <div className=' w-full flex justify-center'>
        <div className="w-full rounded-lg shadow bg-gray-300 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <div className='flex items-center justify-center'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                        Register
                    </h1>
                </div>

                <div className='flex flex-col w-full md:w-[60%] mt-0'>
                    <div className={`flex flex-wrap gap-x-2 bg-slate-100 border-b-[1px] border-slate-950 w-fit px-[4px]  rounded-3xl  text-white`}>
                        <button className={` px-[15px] rounded-full transition-all duration-400 ${accountType === ACCOUNT_TYPE.BUYER ? " bg-slate-950 text-white" : "bg-transparent text-black"}`} onClick={() => setAccountType(ACCOUNT_TYPE.BUYER)}>
                            BUYER
                        </button>
                        <button className={`py-[8px] px-[15px] rounded-full transition-all duration-400 ${accountType === ACCOUNT_TYPE.SELLER ? " bg-slate-950 text-white" : "bg-transparent text-slate-950"}`} onClick={() => setAccountType(ACCOUNT_TYPE.SELLER)}>
                            SELLER
                        </button>
                    </div>
                </div>

                <form  onSubmit={handleSubmit(onSubmit)} action="#">
                    <label className="w-full">
                       <p className="text-[0.875rem]  text-slate-950 mb-1 leading-[1.375rem]">First Name<sup className="text-pink-200">*</sup></p>
                       <input type="text" name="firstName" id="firstName" {...register("firstName")} className="bg-white  text-slate-950 rounded-[0.5rem] w-full 
                        p-[12px] border-b-[1px] border-richblack-100"
                        required placeholder='Enter Your First Name'/>
                    </label>
                    <label className="w-full">
                       <p className="text-[0.875rem]  text-slate-950 mb-1 leading-[1.375rem]">Last Name<sup className="text-pink-200">*</sup></p>
                       <input type="text" name="lastName" id="lastName" {...register("lastName")} className="bg-white  text-slate-950 rounded-[0.5rem] w-full 
                        p-[12px] border-b-[1px] border-white"
                        required placeholder='Enter Your Last Name'/>
                    </label>
                    
                    <label className="w-full mt-1">
                       <p className="text-[0.875rem] text-slate-950 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
                       <input type="email" name="Email" id="Email" {...register("email")} className="bg-white  text-slate-950 rounded-[0.5rem] w-full 
                        p-[12px] border-b-[1px] border-white"
                        required placeholder='Enter Email Address'/>
                    </label>
                    <div className='mt-1'>
                        <label className='w-full'>
                            <p className="text-[0.875rem] text-slate-950 mb-1 leading-[1.375rem]">Password<sup className="text-pink-200">*</sup></p>
                            <input type= "password" name="password" id="password" {...register("password")} className="bg-white rounded-[0.5rem] text-slate-950 w-full p-[12px] border-b-[1px] border-white" required  placeholder='Enter Password'/>


                        </label>
                    </div>

                   <button type="submit" className=" w-full mt-5 bg-slate-950 rounded-[8px] font-medium text-white px-[12px] py-[8px]  hover:bg-slate-800 transition-all duration-500">Signup</button>
                </form>   
            </div>
        </div>     
    </div>
    </div>
  )
}

export default Signup
