import express from 'express';
import { loginUser } from '../../controllers/auth';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const router = express();
// const router = express.Router();

const validator = createValidator({ passError: true });

const userSchema = Joi.object({
  email: Joi.string().email().allow('').label('Email'),
  password: Joi.string().trim().required().label('Password'),
});

router.post(
  '/login',
  validator.body(userSchema, { joi: { convert: true, allowUnknown: false } }),
  loginUser
);

export default router;
