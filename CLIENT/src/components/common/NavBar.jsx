import React from 'react'
import LogBtn from '../core/Navbar/LogBtn';
import { NavbarLinks } from '../../data/NavbarLinks';
import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from "../../assets/Images/logo.png"
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';

const NavBar = () => {
  const location=useLocation();
  const {token} = useSelector((state) => state.auth);

  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}


  return (
    <div className={` fixed w-full z-[9999] border-b-[2px] border-b-richblack-700  bg-richblack-800 top-0 h-16`}>
    <div className='flex w-11/12 max-w-maxContent items-center justify-between mx-auto'>
        
        <Link to="/">
          <img className='p-3' src={Logo} alt="logo" width={160} height={8} loading='lazy'/>
        </Link>
        <ul className='flex items-center gap-x-6 text-richblack-25 '>
             {
              NavbarLinks.map((link,index)=> {
                return (
                  <li key={index}>
                    <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "font-bold underline" :  ""}`}>
                                {link.title}
                        </p>
                     </Link>
                  </li>
                )
              })
             }
        </ul>
          {
            token==null && (
              <div className='mr-2 flex gap-x-2'>
                  <LogBtn  link={"/login"} text={"Log In"}/>
                  <LogBtn link={"/Signup"} text={"Signup"} />
              </div>
            )
          }
            {
              token !== null && <ProfileDropDown/>
            }
    </div>
    </div>

  )
}

export default NavBar
