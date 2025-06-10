const scheduleController = require('../controllers/schedule')
const router = require('express').Router()
import { isAdmin } from '../middlewears/verify_role'
import { verifyToken } from '../middlewears/verify_token'

router.post('/', scheduleController.getSchedulesController)
router.post('/detail', scheduleController.getScheduleByIdController)

router.use(verifyToken)
router.use(isAdmin)
router.post('/list', scheduleController.getAllSchedulesByRouteIdController)
router.post('/add', scheduleController.addScheduleController)
router.post('/update', scheduleController.updateScheduleController)
router.post('/delete', scheduleController.deleteScheduleController)

module.exports = router