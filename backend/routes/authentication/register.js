import express from 'express';
import { registerUser } from '../../controllers/auth';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({ passError: true });

const router = express.Router(); // Use express.Router() instead of express()

const userSchema = Joi.object({
  name: Joi.string().allow('').label('Name'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().trim().label('Password'),
});

router.post(
  '/register',
  validator.body(userSchema, { joi: { convert: true, allowUnknown: false } }),
  registerUser
);

export default router;
