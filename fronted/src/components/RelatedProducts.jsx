import React, { useContext, useState, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import Tittle from '../components/Tittle';
import { ShopContext } from '../context/ShopContext';

// Import images
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

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const productsCopy = products.filter(item => 
        item.category === category && item.subCategory === subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className="text-center text-3xl py-2">
        <Tittle text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map(item => (
            <ProductItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={imageMap[item.image] || ""} // Use mapped image
            />
          ))}
        </div>
      ) : (
        <p>No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
