import pkg from 'cloudinary'; 
const { v2: cloudinary } = pkg; 
import EventEmitter from 'events';
import productModel from '../models/productModel.js';

// Increase the limit for all EventEmitters if needed
EventEmitter.defaultMaxListeners = 20; 

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes,image, bestSeller, properties } = req.body;

        // Check required fields
        if (!name || !description || !price || !category) {
            return res.status(422).json({ success: false, message: 'Name, description, price, and category are required' });
        }

        // Log to check if multer received any files
        console.log('Files received:', req.files);

        // Ensure that images exist
        const images = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0],
            req.files?.image4?.[0]
        ].filter(Boolean); 

        // Log each image to verify what's being processed
        images.forEach((img, index) => console.log(`Image ${index + 1}:`, img));

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one image must be uploaded' });
        }

        // Upload images to Cloudinary and collect URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    console.log('Uploading image:', item.path); // Log the image path before upload
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    console.log('Upload successful:', result.secure_url); // Log the URL of the uploaded image
                    return result.secure_url; // Store the URL of the uploaded image
                } catch (uploadError) {
                    console.error('Cloudinary upload error:', uploadError);
                    throw new Error('Image upload failed'); // Rethrow error for central handling
                }
            })
        );

        // Filter out any null values in case of upload failures
        imagesUrl = imagesUrl.filter(Boolean);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true",
            sizes: sizes ? JSON.stringify(sizes) : null,
            image: imagesUrl,
            properties: properties ? JSON.stringify(properties) : null,
            date: Date.now()
        };

        console.log('Product Data:', productData); // Log the product data being saved

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({ // Use 201 Created status for successful creation
            success: true,
            message: 'Product added successfully',
            product: productData, // Return the saved product data
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding the product',
            error: error.message, // Include the error message for debugging (optional)
        });
    }
};


const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error listing products:', error); // Logs the complete error
        res.status(500).json({ success: false, message: 'Failed to retrieve products. Please try again later.' });
    }
};


const removeProduct = async (req, res) => {
    try {
        const { id } = req.body; // Destructure id from request body
        console.log('Request body for removal:', req.body); // Log the request body

        const product = await productModel.findById(id);
        if (!product) {
            console.log('Product not found with ID:', id); // Log the ID if not found
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body; // Destructure productId from request body
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching single product:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Export all the functions
export { addProduct, listProduct, removeProduct, singleProduct };
