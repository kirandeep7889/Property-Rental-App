import React from 'react'
import ProfileInformation from './Settings/ProfileInformation'
import PasswordUpdate from './Settings/PasswordUpdate'


function Settings() {
  return (
    <div>
      <p className=' text-richblack-300 text-lg left-6 font-semibold p-10 pb-0'>Home / Dashboard / <span className=' text-yellow-900 font-semibold'>My Profile</span></p>
      <h1 className=' text-3xl font-normal py-3 text-richblack-5 pl-10'>Settings</h1>
      <div className=' flex items-center justify-center flex-col gap-4 w-[75%] mx-auto pb-14'>
 
        {/* PROFILE INFORMATION */}
        <ProfileInformation/>

        {/* CHANGE PASSWORD */}
        <PasswordUpdate/>
      </div>
    </div>
  )
}

export default Settings