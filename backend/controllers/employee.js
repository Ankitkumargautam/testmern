import User from '../models/user';

export const getAllEmployee = async (req, res) => {
  try {
    const employees = await User.find({});
    console.log('req.user: ', req.user);
    return res
      .status(200)
      .json({ status: 200, data: employees, message: 'All employees' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: 'Employee not found' });
  }
};
