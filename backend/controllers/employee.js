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

export const getEmpPage = async (req, res) => {
  try {
    const payload = req.query;

    const page = parseInt(payload.page, 10) || 1; // Convert to number and default to 1
    const limit = parseInt(payload.limit, 10) || 10; // Convert to number and default to 10
    const skip = (page - 1) * limit;

    let sortDirection = parseInt(payload.sortValue, 10) || -1; // Convert to number and default to -1 for descending
    const sortBy = payload.sortBy || 'createdAt'; // Default sorting by createdAt if sortBy is not provided

    const query = [
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: 'users',
          let: { userID: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$userID'], // Corrected order of fields
                },
              },
            },
            {
              $project: {
                name: 1,
                email: 1,
              },
            },
          ],
          as: 'addedBy',
        },
      },
      {
        $unwind: { path: '$addedBy', preserveNullAndEmptyArrays: true },
      },

      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'userId',
      //     foreignField: '_id',
      //     as: 'addedBy',
      //   },
      // },
      // { $unwind: '$addedBy' },

      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          userId: 1,
          addedBy: 1,
          createdAt: 1,
          updatedAt: 1,
          insensitive: { $toLower: `$${sortBy}` }, // Project a new field "insensitive" with lowercased value of sortBy field
        },
      },
      { $sort: { insensitive: sortDirection } }, // Sort based on the new field "insensitive"
      // {
      //   $group: {
      //     _id: '$createdAt',
      //     root: { $first: '$$ROOT' },
      //   },
      // },
      // {
      //   $replaceRoot: { newRoot: '$root' },
      // },
    ];

    if (payload.search && payload.search !== '') {
      const regex = new RegExp(payload.search, 'i');
      query.push({
        $match: {
          $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
        },
      });
    }

    const pagination = [{ $skip: skip }, { $limit: limit }];

    const pipeline = query.concat(pagination); // Concatenate query and pagination arrays

    const employees = await Employee.aggregate(pipeline);

    // Calculate total count without pagination
    const total = await Employee.aggregate([...query, { $count: 'total' }]);
    const totalCount = total.length > 0 ? total[0].total : 0;

    // const total = await Employee.find();
    // const totalCount = total.length > 0 ? total.length : 0;

    return res.status(200).json({
      status: 200,
      data: employees,
      message: 'All employees',
      total: totalCount,
    });
  } catch (error) {
    console.error('Error:', error); // Log any errors that occur
    return res.status(400).json({ status: 400, message: 'Employee not found' });
  }
};
