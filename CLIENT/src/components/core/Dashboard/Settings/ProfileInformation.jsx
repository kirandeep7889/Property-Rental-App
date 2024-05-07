import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../../../services/operations/settingsApi';

function ProfileInformation() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState:{errors, isSubmitSuccessful}, reset } = useForm();
    const [ loading,setLoading ] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const genders = ["Male", "Female", "Others"]

    const onSubmit = (data) => {
        if(!data.firstName) return 
        console.log(data)
        data.token = token
        try{
            setLoading(true)
            dispatch(updateUserDetails(data)).then(() => setLoading(false))
        }catch(err){
            console.log("PROFILE UPDATION FAILED",err)
        }
    }

    useEffect(() => {
        reset();
    },[isSubmitSuccessful,reset])

  return (
    <div className=' flex flex-col gap-5 w-full border-[1px] border-richblack-700 p-5 rounded-lg bg-slate-200 relative'>
        <p className='font-normal text-lg text-black'>Profile Information</p>
        <form className=' grid grid-cols-2 gap-x-8 gap-y-5' onSubmit={handleSubmit(onSubmit)}>
            <label className=' relative'>
                <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">First Name</p>
                <input type="text" disabled={loading} defaultValue={user?.firstName} placeholder='Enter First Name' {...register("firstName",{required:true})} 
                className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black"/>
                {
                    errors.firstName && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">First Name cannot be empty</span>)
                }

            </label>
            <label>
                <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">Last Name</p>
                <input type="text" disabled={loading} defaultValue={user?.lastName} placeholder='Enter Last Name' {...register("lastName")} className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black"/>
            </label>
            <div>
                <label htmlFor='dateOfBirth' className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">Date of Birth</label>
                <input type='date' disabled={loading} name='dateOfBirth' {...register("dateOfBirth",{ max: {value: new Date().toISOString().split("T")[0]}})} defaultValue={user?.additionalDetails?.dateOfBirth} className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black"/>
            </div>
            <div>
                <label htmlFor='gender' className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">Gender</label>
                <select type="text" name='gender' disabled={loading} defaultValue={user.additionalDetails.gender} {...register("gender")} className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black">
                <option value="" disabled>Select Your Gender</option>
                {
                    genders.map((ele,i) => {
                        return(<option key={i} value={ele}>{ele}</option>)
                    })
                }
                </select>
            </div>
            <label>
                <p className="text-[0.875rem] text-black mb-1 leading-[1.375rem]">Contact Number</p>
                <div className='flex gap-1 relative'>
                    <div className='bg-slate-100 rounded-[0.5rem] text-richblack-5  p-[12px] border-b-[1px] border-black w-[15%]'>+91</div>
                    <input type="tel" disabled={loading} maxLength={10} defaultValue={user.additionalDetails.contactNumber} placeholder='9876543210' {...register("contactNumber", {maxLength:{value:10,message:"Please Enter Maximum 10 Digits"},minLength:{value:10,message:"Please Enter Minimum 10 Digits"}})} className="bg-slate-100 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-black"/>
                    {
                        errors.contactNumber && (<span className=" absolute -bottom-6 w-full left-0 form-field-title text-xs text-pink-600 mt-1">{errors.contactNumber.message}</span>)
                    }
                </div>
            </label>
            <div className=' w-full left-0 flex gap-4 absolute -bottom-12 justify-end items-center'>
                {
                    !loading && (<div>
                        <button disabled={loading} onClick={() => navigate('/dashboard/my-profile')} className=' text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 bg-slate-900 text-white py-1 px-5'>Cancel</button>
                    </div>)
                }
                <button disabled={loading} type='submit' onClick={handleSubmit} 
                className={` text-center text-sm md:text-base font-medium rounded-md leading-6 hover:scale-95 transition-all duration-200 flex place-items-center 
                gap-2 ${loading ?  " text-richblack-5" : " bg-yellow-600 text-richblack-900"}  py-1 px-5`}>{loading ? "Saving..." : "Save"}</button>
            </div>
        </form>
    </div>
  )
}

export default ProfileInformation