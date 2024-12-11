import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; 
import RelatedProducts from '../components/RelatedProducts';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';


// Map image names to imported images
const imageMap = {
  "image1.jpg": image1,
  "image2.jpg": image2,
  "image3.jpg": image3,
  "image4.jpg": image4,
  "image5.jpg": image5,
  "image6.jpg": image6,
  "image7.jpg": image7,
  "image8.jpg": image8,
  
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        // Set the first image or a fallback if image not found in the map
        setImage(imageMap[product.image] || '');
      }
    };
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-1 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-0 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal">
            {Array.isArray(productData.image) && productData.image.map((item, index) => (
              <img
                onClick={() => setImage(imageMap[item] || '')}  // Use image from map
                key={index}
                className='w-[24%] sm:w-full sm:mb-4 flex-shrink-0'
                src={imageMap[item] || ''}  // Display the mapped image
                alt={`Product image ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className='w-full h-auto' src={image} alt="Selected product" />
          </div>
        </div>

        {/* Product information */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex flex-row items-center gap-1 mt-2">
            <p className='text-center items-center pl-4'>{122}</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='text-gray-500 md:w-4/5'>{productData.description}</p>
          <p>Select Size</p>
          <div className="flex gap-2">
            {productData.sizes.map((item, index) => (
              <button
                onClick={() => setSize(item)}
                className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                key={index}
              >
                {item}
              </button>
            ))}
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray'>
            ADD TO CART
          </button>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'>{'>'}</div>;
};

export default Product;
