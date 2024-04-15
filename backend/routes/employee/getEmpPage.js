import express from 'express'
import { checkToken } from '../../config/checkToken'
import { getEmpPage } from '../../controllers/employee'

const router = express.Router()

router.get('/getEmpPage',checkToken, getEmpPage)

export default router

