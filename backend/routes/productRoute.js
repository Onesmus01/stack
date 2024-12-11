import express from 'express';
import multer from 'multer'; // Import multer
import { listProduct, addProduct, singleProduct, removeProduct } from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js'

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); // Create a unique filename
    },
});

const upload = multer({ storage }); 


const uploadMiddleware = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]);

const productRouter = express.Router();


productRouter.post('/add', (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err); // Log the specific multer error
            return res.status(500).json({ success: false, message: err.message });
        } else if (err) {
            console.error('General Error:', err); // Log any other error
            return res.status(500).json({ success: false, message: 'An error occurred during file upload.' });
        }
        next(); 
    });
}, addProduct);

productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);

export default productRouter;
