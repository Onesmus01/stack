import React, { useState, useEffect } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`, {
        headers: { Authorization: `Bearer ${token}` } // Include the token here
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching product list');
    }
  };

  const removeProducts = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/products/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } } // Include the token here
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error removing product');
    }
  };

  useEffect(() => {
    fetchList(); // Fetch the product list on initial render
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Products List</h2>
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b bg-gray-100 text-sm text-gray-700 font-semibold">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>
      
      <div className="flex flex-col gap-4 mt-4">
        {list.length > 0 ? (
          list.map((item) => (
            <div className="flex items-center justify-between py-3 px-4 border-b bg-gray-50 hover:bg-gray-100 transition duration-200" key={item._id}>
              <img className="w-20 h-20 object-cover rounded-md" src={item.image[0] || '/placeholder-image.png'} alt={item.name} />
              <p className="flex-1 ml-4 text-gray-800 font-medium">{item.name}</p>
              <p className="flex-1 text-gray-600">{item.category}</p>
              <p className="flex-1 font-semibold text-gray-900">{currency}{item.price}</p>
              <button 
                onClick={() => removeProducts(item._id)} 
                className="text-red-600 hover:text-red-800 transition duration-200"
                aria-label="Remove product"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
