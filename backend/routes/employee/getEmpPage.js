import express from 'express';
import { checkToken } from '../../config/checkToken';
import { getEmpPage } from '../../controllers/employee';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { errorJoiMiddleware } from '../../config/errorMiddleware';

const validator = createValidator({ passError: true });

const router = express.Router();

const emplistSchema = Joi.object({
  search: Joi.string().optional().allow('').label('Search'),
  page: Joi.number().required().label('Page Number'),
  limit: Joi.number().required().label('Limit'),
  sortBy: Joi.string().label('Sort By'),
  sortValue: Joi.number().label('Sort value'),
});

router.get(
  '/getEmpPage',
  validator.query(emplistSchema, {
    joi: { convert: true, allowUnknown: false },
    errorHttpStatusCode: 400,
  }),
  checkToken,
  getEmpPage
);

// Custom error handler middleware
router.use(errorJoiMiddleware);

export default router;
