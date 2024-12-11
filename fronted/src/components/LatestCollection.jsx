import React, { useState, useEffect, useContext } from 'react';
import Tittle from "./Tittle"; // Ensure "Tittle" is the correct component
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';
import image9 from '../assets/image9.jpg';
import image10 from '../assets/image10.jpg';
import image11 from '../assets/image11.jpg';

const imageMap = {
  "image1.jpg": image1,
  "image2.jpg": image2,
  "image3.jpg": image3,
  "image4.jpg": image4,
  "image5.jpg": image5,
  "image6.jpg": image6,
  "image7.jpg": image7,
  "image8.jpg": image8,
  "image9.jpg": image9,
  "image10.jpg": image10,
  "image11.jpg": image11,
};

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 5)); // Limiting to the 5 latest products
  }, [products]);

  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <Tittle text1={'LATEST'} text2={"COLLECTION"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis a voluptates exercitationem!
        </p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem 
            key={index} 
            id={item._id} 
            image={imageMap[item.image] || image1} // Fallback to image1 if image not found
            name={item.name} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
