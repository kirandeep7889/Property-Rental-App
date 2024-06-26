import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import useOnClickOutside from '../../../Hooks/useOnClickOutside';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import ConfirmationModal from '../../common/ConfirmationModal';

export default function ProfileDropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [ open,setOpen ] = useState(false)
  const ref = useRef(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useOnClickOutside(ref, () => setOpen(false))

  if(!user) return null

  console.log(user)
    
  return (
    <div className='cursor-pointer relative ' onClick={() => setOpen(true)}>
      <img className='rounded-full aspect-square w-[30px] h-[30px] object-cover' src={user?.image} alt={`${user.firstName}`}/>
      {
        open && (
          <div onClick={(e) => e.stopPropagation()} ref={ref} className='absolute left-[50%] top-[50%] z-[1000] flex w-[50px] translate-x-[-50%] translate-y-[2em] flex-col rounded-lg bg-slate-200 p-1  transition-all duration-150 lg:w-[150px]'>
            <div className="absolute left-[35%] top-0 -z-10 h-6 w-6 translate-x-[50%] translate-y-[-40%] rotate-45 select-none rounded bg-slate-200"></div>
            <div>
              <Link to={'/dashboard/my-profile'}>
                  <p className='rounded-lg text-black bg-slate-200 py-2 pl-2 hover:bg-slate-100 flex place-items-center gap-2' onClick={() => setOpen(false)}>
                    <VscDashboard className="text-lg"/>
                    Dashboard
                  </p>
              </Link>
              {
                  user.role=== "buyer"  ?  
                  <Link to={'/dashboard/Customer-Bookings'}>
                      <p className='rounded-lg text-black bg-slate-200 py-2 pl-2 hover:bg-slate-100 flex place-items-center gap-2' onClick={() => setOpen(false)}>
                        <VscDashboard className="text-lg"/>
                           Customer Bookings
                      </p>
                  </Link>
              : 
              <div>
              <Link to={'dashboard/seller/Properties'}>
                  <p className='rounded-lg text-black bg-slate-200 py-2 pl-2 hover:bg-slate-100 flex place-items-center gap-2' onClick={() => setOpen(false)}>
                    <VscDashboard className="text-lg"/>
                      Seller Properties
                  </p>
              </Link>
              <Link to={'/dashboard/Seller-Bookings'}>
                  <p className='rounded-lg text-black bg-slate-200 py-2 pl-2 hover:bg-slate-100 flex place-items-center gap-2' onClick={() => setOpen(false)}>
                    <VscDashboard className="text-lg"/>
                      Seller Bookings
                  </p>
              </Link>
              <Link to={'/dashboard/Add-Property'}>
                  <p className='rounded-lg text-black bg-slate-200 py-2 pl-2 hover:bg-slate-100 flex place-items-center gap-2' onClick={() => setOpen(false)}>
                    <VscDashboard className="text-lg"/>
                     Add Property
                  </p>
              </Link>
              </div>
              }
              <div className='rounded-lg text-black bg-slate-200 py-2 pl-2 hover:bg-slate-100 flex place-items-center gap-2' onClick={() => { setConfirmationModal({
                                                                                                text1: "Are You Sure?",
                                                                                                text2: "You Will be Logged Out of Your Account",
                                                                                                btn1Text : "Logout",
                                                                                                btn2Text : "Cancel",
                                                                                                btn1Handler : () => dispatch(logout(navigate)),
                                                                                                btn2Handler : () => setConfirmationModal(null),
                                                                                            })}}>
                  <div className=' flex items-center gap-x-2'>
                    <VscSignOut className="text-lg"/>
                    <span>Logout</span>
                  </div>
              </div>
            </div>
          </div>
        )
      }
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}