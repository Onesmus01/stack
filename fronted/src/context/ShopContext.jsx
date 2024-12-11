import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this environment variable is set correctly
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage on load
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        setCartItems(prevCartItems => {
            const updatedCart = { ...prevCartItems };
            updatedCart[itemId] = {
                ...updatedCart[itemId],
                [size]: (updatedCart[itemId]?.[size] || 0) + 1,
            };
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((totalCount, sizes) => {
            return totalCount + Object.values(sizes).reduce((count, qty) => count + qty, 0);
        }, 0);
    };

    const updateQuantity = async (itemId, size, quantity) => {
        setCartItems(prevCartItems => {
            const updatedCart = { ...prevCartItems };

            if (quantity <= 0) {
                delete updatedCart[itemId][size];
                if (Object.keys(updatedCart[itemId]).length === 0) {
                    delete updatedCart[itemId];
                }
            } else {
                updatedCart[itemId][size] = quantity;
            }

            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Error updating quantity:', error);
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    const getCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, itemId) => {
            const itemInfo = products.find(product => product._id === itemId);
            const sizes = cartItems[itemId];
            const itemTotal = Object.keys(sizes).reduce((subtotal, size) => {
                return subtotal + (itemInfo.price * sizes[size]);
            }, 0);
            return totalAmount + itemTotal;
        }, 0);
    };

    const getProductsData = async () => {
        if (!token) {
            console.warn('No token found, skipping product fetch.');
            return;
        }

        try {
            const response = await axios.get(
                `${backendUrl}/api/products/list`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setProducts(response.data.products);
                console.log('Fetched products:', response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.response?.data?.message || error.message);
            if (error.response && error.response.status === 401) {
                console.warn('Unauthorized access, logging out...');
                logout(); // Log out if unauthorized
            }
        }
    };

    useEffect(() => {
        if (token) {
            getProductsData();
        }
    }, [token]);

    const getUserCart = async () => {
        if (!token) return;

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user cart:', error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserCart();
        }
    }, [token]);

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setCartItems({});
        navigate('/login');
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        getProductsData,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        setToken,
        token,
        logout,
        backendUrl,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
