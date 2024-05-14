import React, { useEffect, useState } from 'react'
import LogBtn from '../core/Navbar/LogBtn';
import { NavbarLinks } from '../../data/NavbarLinks';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';
import { FaSearch } from 'react-icons/fa';


const NavBar = () => { 
  const {token} = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);



  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Real</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

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
          <div className='flex items-center'>
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
        </ul> 
      </div>
    </header>    
  )
}

export default NavBar
