import express from 'express';
import { checkToken } from '../../config/checkToken';
import { getAllEmployee } from '../../controllers/employee';

const router = express.Router();

router.get('/getAllEmployee', checkToken, getAllEmployee);

export default router;
