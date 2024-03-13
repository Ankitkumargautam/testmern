import mongoose from 'mongoose';
const employeeSchema = mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String },
    phone: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
