import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const adminAuth = async (req, res, next) => {
    try {
        // Retrieve the Authorization header
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);

        // Check for the presence of the token
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];
        console.log('Received Token:', token);

        // Verify the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', tokenDecode);

        // Check if the decoded token's email matches the admin's email
        if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        // Attach user information to the request for further use in other middleware/routes
        req.user = { email: tokenDecode.email }; 

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);

        // Handle specific token errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token or unauthorized' });
    }
};

export default adminAuth;
