import React, { useState, useEffect, useContext } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Show search bar only on collection pages
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center py-3'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm p-2'
          type='text'
          placeholder='Search...'
        />
        <FaSearch onClick={() => console.log("Search triggered")} className='w-4 cursor-pointer' />
      </div>
      <FaTimes  className='inline w-4 ml-2 cursor-pointer' />
    </div>
  ) : null;
};

export default SearchBar;
