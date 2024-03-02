import { generateToken } from '../config/generateToken';
import User from '../models/user';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Please provide complete information',
      });
    }

    if (password.length < 6)
      return res.status(400).json({
        status: 400,
        message: 'Password length should be minimum 6',
      });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(400).json({
        status: 400,
        message: 'User is already registered',
      });

    let newUser = {
      name: name,
      email: email,
      password: password,
    };

    const user = await User.create(newUser);
    if (user) {
      return res.status(400).json({
        status: 400,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: await generateToken(user._id),
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
      stack: error.stack,
    });
  }

  return res.send('Register');
};
