import userModel from '../models/userModel.js';

// Add products to userCart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);

        // Check if `cartData` exists, if not initialize it as an empty object
        let cartData = userData.cartData || {};

        // Initialize item if it doesn't exist in cartData
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Increment quantity for specific size if it exists, otherwise set it to 1
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Item added to the cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update userCart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Check if the item and size exist before updating
        if (!cartData[itemId]) {
            return res.status(400).json({ success: false, message: 'Item not found in cart' });
        }

        // Update the quantity for the specified size
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get userCart data
// Get userCart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        
        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {}; 

        console.log('User cartData:', cartData);
        res.json({ success: true, cartData });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.json({ success: false, message: error.message });
    }
};





export { addToCart, updateCart, getUserCart };
