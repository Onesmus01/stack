import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'; // Make sure to import from the correct path
import Tittle from './Tittle';

const CartTotal = () => { // Removed async keyword here
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchCartTotal = async () => {
      const totalAmount = await getCartAmount(); // This is fine to be async
      setCartTotal(totalAmount);
    };
    fetchCartTotal();
  }, [getCartAmount]);

  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Tittle text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {cartTotal}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {cartTotal === 0 ? 0 : cartTotal + delivery_fee}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
