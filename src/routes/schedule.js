const scheduleController = require('../controllers/schedule')
const router = require('express').Router()

router.post('/', scheduleController.getSchedulesController)

module.exports = router