import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // Assuming you have ShopContext in your project

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); // Access currency from context
  
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        {/* Corrected image source */}
        <img className='hover:scale-110 transition ease-in-out' src={image} alt={name} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className=''>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
