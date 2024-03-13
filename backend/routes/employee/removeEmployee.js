import express from 'express';
import { checkToken } from '../../config/checkToken';
import { removeEmployee } from '../../controllers/employee';

const router = express.Router();

router.delete('/removeEmployee/:id', checkToken, removeEmployee);

export default router;
