const scheduleController = require('../controllers/schedule')
const router = require('express').Router()

router.post('/', scheduleController.getSchedulesController)
router.post('/detail', scheduleController.getScheduleByIdController)

module.exports = router