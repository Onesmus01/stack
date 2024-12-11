import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Tittle';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchCartTotal = async () => {
      const totalAmount = await getCartAmount();
      setCartTotal(totalAmount);
    };
    
    fetchCartTotal();
  }, [getCartAmount]);

  const totalWithShipping = (cartTotal + delivery_fee).toFixed(2);

  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Tittle text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {cartTotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {totalWithShipping}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
