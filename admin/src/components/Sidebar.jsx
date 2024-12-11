import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-6 text-[15px]">
        <NavLink
          className="flex items-center gap-3 border-b-2 px-3 py-2"
          to="/add"
        >
          <img className="h-5 w-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border-b-2 px-3 py-2"
          to="/list"
        >
          <img className="h-5 w-5" src={assets.order_icon} alt="List Icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border-b-2 px-3 py-2"
          to="/orders"
        >
          <img className="h-5 w-5" src={assets.order_icon} alt="Orders Icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
