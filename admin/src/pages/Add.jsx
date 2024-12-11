import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token  }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // Cleanup object URLs
    return () => {
      images.forEach((image) => {
        if (image) URL.revokeObjectURL(image);
      });
    };
  }, [images]);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('No authorization token found. Please log in.');
      return;
    }

    if (price <= 0) {
      toast.error('Price must be a positive number');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendUrl}/api/products/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      toast.error(errorMessage);
      console.error('Error during submission:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('men');
    setSubCategory('Topwear');
    setBestSeller(false);
    setSizes([]);
    setImages([null, null, null, null]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[55%] items-center gap-6 p-6 mx-10 bg-white shadow-lg rounded-lg">
      {/* Image Upload */}
      <div className="w-full mb-6">
        <p className="font-bold mb-3">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
              <img
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover border rounded-md"
              />
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="font-bold mb-1">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full p-3 border rounded-md"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="font-bold mb-1">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full p-3 border rounded-md"
          placeholder="Enter product description"
          required
        />
      </div>

      {/* Category, Sub-Category, and Price */}
      <div className="w-full flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <p className="font-bold mb-1">Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full p-3 border rounded-md">
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="font-bold mb-1">Sub-Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full p-3 border rounded-md">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="font-bold mb-1">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full p-3 border rounded-md"
            type="number"
            placeholder="Enter price"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="w-full">
        <p className="font-bold mb-2">Available Sizes</p>
        <div className="flex gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
              className={`cursor-pointer px-4 py-2 rounded-md ${sizes.includes(size) ? 'bg-blue-300' : 'bg-gray-200'}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="w-full flex items-center gap-3">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer font-bold">Mark as Bestseller</label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full py-3 mt-6 bg-blue-600 text-white rounded-md text-lg font-bold">
        Add Product
      </button>
    </form>
  );
};

export default Add;
