import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authGuard = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // The token is valid, proceed with user fetching
            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // Token expired
                const err = new Error('Unauthorized, Token has expired');
                err.statusCode = 401;
                return next(err);
            }

            // Other JWT errors (invalid signature, etc.)
            const err = new Error('Unauthorized, Token is not valid');
            err.statusCode = 401;
            next(err);
        }
    } else {
        const err = new Error('Unauthorized, No token provided');
        err.statusCode = 401;
        next(err);
    }
};
