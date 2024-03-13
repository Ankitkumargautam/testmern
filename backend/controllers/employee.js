import Employee from '../models/employee';

export const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json({ status: 200, data: employees, message: 'All employees' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: 'Employee not found' });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const existEmployee = await Employee.findOne({ email });

    if (existEmployee) {
      return res.status(400).json({
        status: 400,
        message: 'Employee already exist',
      });
    }

    const newEmp = {
      name: name,
      email: email,
      phone: phone,
      userId: req.user._id,
    };

    const createdEmployee = await Employee.create(newEmp);

    if (createdEmployee) {
      return res.status(200).json({
        status: 200,
        data: createdEmployee,
        message: 'Employee created successfully!!',
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: 'Employee not created!' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: 'Employee not created' });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (phone.toString().length !== 10)
      return res.status(400).json({
        status: 400,
        message: 'phone number should be 10 character only!',
      });

    const updatedEmp = {
      name: name,
      email: email,
      phone: phone,
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      updatedEmp,
      { new: true }
    );

    if (updatedEmployee) {
      return res.status(200).json({
        status: 200,
        data: updatedEmployee,
        message: 'Employee updated successfully!!',
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: 'Employee not updated!' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: 'Employee not updated' });
  }
};

export const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const removedEmployee = await Employee.findByIdAndRemove(id);

    if (removedEmployee) {
      return res.status(200).json({
        status: 200,
        data: removedEmployee,
        message: 'Employee removed successfully!!',
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: 'Employee not removed!' });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: 'Employee not removed' });
  }
};
