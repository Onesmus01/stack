import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import adminAuth from './middleware/adminAuth.js'; // Import the adminAuth middleware
import orderRouter from './routes/orderRoute.js'
// App config
const app = express();
app.use(express.json());

app.use(cors());
  

const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Logging middleware (optional)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter)
app.get('/', (req, res) => {
    res.send("API WORKING");
});

// Protect admin routes using the adminAuth middleware
app.use('/api/admin', adminAuth, (req, res) => {
    res.send('Welcome to the admin panel');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
