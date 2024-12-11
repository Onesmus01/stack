import React, { useState } from 'react';
import Tittle from '../components/Tittle';
import CartTotal from '../components/CartTotal';
import stripeLogo from '../assets/stripe-logo.svg';
import razorpayLogo from '../assets/razorpay.svg';
import {useNavigate} from 'react-router-dom'



const PlaceOrder = () => {
 
const navigate = useNavigate()

  const [method,setMethod] = useState('cod')
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

  const onChangeHandler = (e) => {
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
    navigate('/orders')
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
            onChange={onChangeHandler}
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='email'
          name='email'
          placeholder='Email Address'
          value={formData.email}
          onChange={onChangeHandler}
          required
        />
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          name='street'
          placeholder='Street'
          value={formData.street}
          onChange={onChangeHandler}
          required
        />
        <div className="flex gap-3">
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={onChangeHandler}
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={onChangeHandler}
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
            onChange={onChangeHandler}
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            name='country'
            placeholder='Country'
            value={formData.country}
            onChange={onChangeHandler}
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
            onChange={onChangeHandler}
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
          <div className="flex flex-col sm:gap-3  lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3 h-3 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={stripeLogo} alt="" />
            </div>

            <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3 h-3  border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={razorpayLogo} alt="" />
            </div>

            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERLY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
         <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          
          </div>
        </div>
     
      </div>
    </form>
  );
};

export default PlaceOrder;
