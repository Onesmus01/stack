import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-gray-100'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-5'>
        {/* Logo and Description */}
        <div>
          <Link to='/'><h1 className='tracking-widest text-gray-700 font-bold text-3xl'>LOGO</h1></Link>
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, odio. Explicabo, sint vel?
          </p>
        </div>

        {/* Company Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About us</Link></li>
            <li><Link to='/delivery'>Delivery</Link></li>
            <li><Link to='/privacy'>Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='text-gray-600'>
            <li>+254-759-755-575</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='border-t border-gray-300'>
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright 2024 LOGO.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
