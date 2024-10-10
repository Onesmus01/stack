import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBars, FaChevronLeft } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch ,getCartCount} = useContext(ShopContext); 

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><h1 className='tracking-widest text-gray-700 font-bold text-3xl'>LOGO</h1></Link>

      {/* Navigation Links for larger screens */}
      <ul className='hidden tracking-wide md:flex gap-5 text-sm text-gray-700'>
        <li>
          <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-black'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:text-black'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className='flex flex-col items-center gap-1 hover:text-black'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:text-black'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-6">
        <FaSearch onClick={() => setShowSearch(true)} className='text-sm w-5 font-semibold cursor-pointer' /> {/* Fixed setShowSearch */}
        <div className="group relative">
          <BiUser className='w-5 cursor-pointer' />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 transition-all ease-in-out duration-200">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <FaShoppingCart className='w-5 min-w-5' alt='' />
          <p className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        {/* Hamburger menu icon for smaller screens */}
        <FaBars 
          onClick={() => setVisible(true)} 
          className='w-5 font-semibold cursor-pointer block md:hidden' 
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div className={`absolute top-0 right-0 h-full bg-white transition-all ${visible ? 'w-full' : 'w-0 hidden'} shadow-lg`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <FaChevronLeft className='h-4' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
