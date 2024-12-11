import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../components/Tittle';

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

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Tittle text1={"MY"} text2={'ORDERS'} />
      </div>
      <div>
        {
          products.slice(1, 4).map((item) => (
            <div key={item._id} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start text-sm gap-6">
                {/* Use the image mapping for displaying images */}
                <img className='w-16 sm:w-20' src={imageMap[item.image] || ""} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-primary-400'>25,Sep,2024</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>Ready to ship</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
