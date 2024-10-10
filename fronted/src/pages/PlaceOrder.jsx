import React, { useState } from 'react';
import Tittle from '../components/Tittle';
import CartTotal from '../components/CartTotal';
import stripeLogo from '../assets/stripe-logo.svg';
import razorpayLogo from '../assets/razorpay.svg';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission logic
    console.log('Order Details:', formData);
    console.log('Selected Payment Method:', selectedPaymentMethod);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* Left side for delivery information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Tittle text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='email'
          name='email'
          placeholder='Email Address'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          name='street'
          placeholder='Street'
          value={formData.street}
          onChange={handleChange}
          required
        />
        <div className="flex gap-3">
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            name='zipcode'
            placeholder='Zipcode'
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='country'
            placeholder='Country'
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='tel'
            name='phone'
            placeholder='Phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Right side for cart total and payment method */}
      <div className="mt-8 w-full sm:max-w-[480px]">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Tittle text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method selection */}
          <div className="flex flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src={stripeLogo} alt="" />
            </div>

            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src={razorpayLogo} alt="" />
            </div>

            <div
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPaymentMethod === 'razorpay' ? 'border-blue-500' : 'border-gray-300'}`}>
              <input type="radio" name="paymentMethod" value="razorpay" checked={selectedPaymentMethod === 'razorpay'} onChange={() => {}} />
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERLY</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
