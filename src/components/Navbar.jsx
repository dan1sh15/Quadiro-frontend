import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navbar = () => {

  const navigate = useNavigate();
  const { loggedIn, userData, setLoggedIn } = useContext(AppContext);
  const [showDropDown, setShowDropDown] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setShowDropDown(false);
    navigate('/login');
  }

  return (
    <div className='w-full h-[10vh] fixed bg-black z-10'>
        <div className='w-10/12 max-phone:w-11/12 h-full mx-auto flex items-center justify-between'>
            <h1 className='text-3xl text-white font-bold max-lg:text-2xl max-md:text-xl max-phone:text-lg max-[210px]:text-sm'>Quadiro Technologies</h1>
            {
              loggedIn ? (
                <div className='flex items-center justify-center'>
                  {
                    showDropDown ? (<ImCross onClick={() => {
                      setShowDropDown(false);
                    }} className='text-white font-bold text-2xl max-ipad:text-xl max-phone:text-lg cursor-pointer'  />) : (<GiHamburgerMenu onClick={() => {
                      setShowDropDown(true);
                    }} className='text-white font-bold text-3xl max-ipad:text-2xl max-phone:text-xl cursor-pointer' />)
                  }

                  <div className={`flex flex-col gap-y-3 absolute shadow-lg ${showDropDown ? 'top-[12vh]' : '-top-[1100px]'} bg-white p-3 rounded transition-all duration-300 ease-linear text-lg px-[2rem] right-10 max-sm:right-5 max-sm:text-sm max-phone:px-4` }>
                      <p><strong>Name: </strong>{userData.name}</p>
                      <p><strong>Role: </strong>{userData.role}</p>

                      <button onClick={logoutHandler} className=' bg-black rounded-md px-2 py-1 w-full text-white max-phone:text-sm'>Logout</button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-x-3 max-phone:hidden'>
                    <button onClick={() => {
                      navigate('/login');
                    }} className='bg-white px-5 py-1 text-lg rounded hover:scale-[1.03] transition-all duration-300 ease-in-out font-semibold border-none outline-none max-ipad:text-[1rem] max-ipad:px-3 max-ipad:py-0 max-phone:text-sm'>Login</button>
                    <button onClick={() => {
                      navigate('/signup');
                    }} className='bg-white px-5 py-1 text-lg rounded hover:scale-[1.03] transition-all duration-300 ease-in-out font-semibold border-none outline-none max-ipad:text-[1rem] max-ipad:px-3 max-ipad:py-0 max-phone:text-sm'>Signup</button>
                </div>
              )
            }
        </div>
    </div>
  )
}

export default Navbar
