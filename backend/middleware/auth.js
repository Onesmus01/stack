import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', token_decode); // Log to verify decoding
        req.body.userId = token_decode.id; // Use `userId` for consistency
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

export default authUser;
