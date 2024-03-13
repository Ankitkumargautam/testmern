import express from 'express';
import { checkToken } from '../../config/checkToken';
import { createEmployee } from '../../controllers/employee';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { errorJoiMiddleware } from '../../config/errorMiddleware';

const validator = createValidator({ passError: true });

const router = express.Router();

const employeeSchema = Joi.object({
  name: Joi.string().required().allow('').label('Name'),
  email: Joi.string().required().email().allow('').label('Email'),
  phone: Joi.number().required().label('Phone'),
});

router.post(
  '/createEmployee',
  validator.body(employeeSchema, {
    joi: { convert: true, allowUnknown: false },
    errorHttpStatusCode: 400,
  }),
  checkToken,
  createEmployee
);

// Custom error handler middleware
router.use(errorJoiMiddleware);

export default router;
