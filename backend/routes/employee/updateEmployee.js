import express from 'express';
import { updateEmployee } from '../../controllers/employee';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { checkToken } from '../../config/checkToken';
import { errorJoiMiddleware } from '../../config/errorMiddleware';

const validator = createValidator({ passError: true });

const router = express.Router();

const employeeSchema = Joi.object({
  name: Joi.string().required().trim().label('Name'),
  email: Joi.string().required().email().label('Email'),
  phone: Joi.number().required().label('Phone'),
});

router.put(
  '/updateEmployee/:id',
  validator.body(employeeSchema, {
    Joi: { convert: true, allowUnknown: false },
    errorHttpStatusCode: 400,
  }),
  checkToken,
  updateEmployee
);

router.use(errorJoiMiddleware);

export default router;
