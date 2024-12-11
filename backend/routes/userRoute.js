import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const userRouter = express.Router(); // Use Router instead of express()

// Define user routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin); // Admin login route

export default userRouter;
