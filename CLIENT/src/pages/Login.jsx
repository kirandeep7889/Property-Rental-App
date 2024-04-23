import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { login } from '../services/operations/authAPI';



const Login = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        data.navigate = navigate;
        console.log(data);
        dispatch(login(data));
    };

    return (
        <div className=' w-full h-[580px] flex flex-col justify-center  items-center mt-20'>
        <div className=' w-full flex justify-center items-center'>
            <div className="w-full rounded-lg shadow bg-pure-greys-25 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-richblack-900">
                        Sign in to your account
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} action="#">
                        <label className="w-full">
                           <p className="text-[0.875rem]  text-richblack-900 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
                           <input type="email" name="Email" id="Email" {...register("email")} className="bg-white  text-richblack-800 rounded-[0.5rem] w-full 
                            p-[12px] border-b-[1px] border-richblack-100"
                            required placeholder='Enter Email Address'/>
                        </label>
                        <div className='mt-5'>
                            <label className='w-full'>
                                <p className="text-[0.875rem] text-richblack-800 mb-1 leading-[1.375rem]">Password<sup className="text-pink-200">*</sup></p>
                                <input type={showPassword ? "text" : "password"} name="password" id="password" {...register("password")} className="bg-white rounded-[0.5rem] text-richblack-800 w-full p-[12px] border-b-[1px] border-richblack-100" required  placeholder='Enter Password'/>
                                <span className='absolute right-3 top-[38px] cursor-pointer'
                                onClick={() => setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                    }
                                </span>
                                <div className=' flex items-center justify-end mt-2'>
                                    <Link to="/forgot-password">
                                        <p className="text-xs font-medium mt-1 text-richblack-800 max-w-max ml-auto italic hover:underline">Forgot Password?</p>
                                    </Link>
                                </div>
                            </label>
                        </div>

                       <button type="submit" className=" w-full bg-richblack-900 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-3 hover:bg-richblack-800 transition-all duration-500">Sign In</button>
                    </form>   
                </div>
            </div>     
        </div>
        </div>

    );
}

export default Login;
