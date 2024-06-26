import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import toast from 'react-hot-toast';
import { updatePassword } from '../../../../services/operations/settingsApi';

function PasswordUpdate() {
    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState : {errors, isSubmitSuccessful}, reset } = useForm();
    const [ loading,setLoading ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const onSubmit = (data) => {
        if(data.oldPassword === data.newPassword) { toast.error("Both Passwords Can't Be Same"); return}
        try{
            setLoading(true)
            data.token = token
            dispatch(updatePassword(data)).then(() => setLoading(false))
        }catch(err){
            console.log("PASSWORD CHANGED FAILED",err)
        }
    };

    useEffect(() => {
        reset()
      }, [reset,isSubmitSuccessful])
      
  return (
    <div className=' flex flex-col gap-5 w-full border-[1px]  p-5 pb-10 rounded-lg mt-12 bg-slate-200 relative'>
        <p className='font-normal text-lg text-black'>Update Password</p>
        <form className=' grid grid-cols-2 gap-x-8 gap-y-5' onSubmit={handleSubmit(onSubmit)}>
            <label className='relative'>
                <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">Current Password</p>
                <input disabled={loading} type={showOldPassword ? ("text"):("password")} placeholder='Enter Current Password' {...register("oldPassword", {required : true})} 
                className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black"/>
                <span className="absolute top-[125px] right-3 sm:top-[38px] cursor-pointer"
                    onClick={() => setShowOldPassword((prev) => !prev)}>
                    {showOldPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                </span>
                {
                    errors.oldPassword && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">Please Enter Your Current Password</span>)
                }
            </label>
            <label className='relative'>
                <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">New Password</p>
                <input disabled={loading} type={showNewPassword ? ("text"):("password")} placeholder='Enter New Password' {...register("newPassword", {required : true})} className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black"/>
                <span className="absolute top-[125px] right-3 sm:top-[38px] cursor-pointer"
                    onClick={() => setShowNewPassword((prev) => !prev)}>
                    { showNewPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                </span>
                {
                    errors.newPassword && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">Please Enter New Password</span>)
                }
            </label>
            <div className=' w-full left-0 flex gap-4 absolute -bottom-12 justify-end items-center'>
                {
                    !loading && (<div>
                        <button onClick={() => navigate('/dashboard/my-profile')} disabled={loading} className='text-center text-sm md:text-base font-medium rounded-md leading-6 
                        hover:scale-95 transition-all duration-200 bg-slate-900 text-white py-1 px-5'>Cancel</button>
                    </div>)
                }
                <button type='submit' onClick={handleSubmit} disabled={loading} 
                className={` ${loading ?  "bg-slate-900 text-white" : " bg-yellow-600 text-black"} text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 flex place-items-center gap-2 py-1 px-5`}>{loading ? "Updating..." : "Update"}</button>
            </div>
        </form>
    </div>
  )
}

export default PasswordUpdate