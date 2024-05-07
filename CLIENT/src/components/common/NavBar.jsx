import React from 'react'
import LogBtn from '../core/Navbar/LogBtn';
import { NavbarLinks } from '../../data/NavbarLinks';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';

const NavBar = () => {
  
  const {token} = useSelector((state) => state.auth);


  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Real</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className=' sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className=' sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
        </ul> 
        <div>
        {
            token==null && (
              <div className='mr-2 flex gap-x-2'>
                  <LogBtn  link={"/login"} text={"Log In"}/>
                  <LogBtn link={"/Signup"} text={"Signup"} />
              </div>
            )
          }
            {
              token !== null && 
              <div className='flex flex-row items-center gap-x-4'>
               <ProfileDropDown/>
              </div>
            }
        </div>
      </div>
    </header>    
  )
}

export default NavBar
