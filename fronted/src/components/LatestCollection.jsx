import React, { useState, useEffect } from 'react';
import Tittle from "./Tittle"; // Ensure "Tittle" is the correct component
import ProductItem from './ProductItem';

const productsData = [
  { id: 1, _id: "prod1", image: "image1.jpg", name: "Product 1", price: 29.99 },
  { id: 2, _id: "prod2", image: "image2.jpg", name: "Product 2", price: 19.99 },
  { id: 3, _id: "prod3", image: "image3.jpg", name: "Product 3", price: 49.99 },
  { id: 4, _id: "prod4", image: "image4.jpg", name: "Product 4", price: 99.99 },
  { id: 5, _id: "prod5", image: "image5.jpg", name: "Product 5", price: 89.99 }
];

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(productsData.slice(0,10)); 
  }, []);

  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <Tittle text1={'LATEST'} text2={"COLLECTION"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis a voluptates exercitationem!
        </p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
