import jwt from 'jsonwebtoken';
import User from '../models/user';

export const checkToken = async (req, res, next) => {
  if (!req.headers['authorization'])
    return res.status(401).json({ status: 401, message: 'No token provided' });

  const token = req.headers['authorization'].split(' ')[1];

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id).select('-password');
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ status: 401, message: 'Token has been expired' });
    } else {
      return res.status(401).json({
        status: 401,
        message: 'Internal Server Error',
        stack: error.stack,
      });
    }
  }
};
