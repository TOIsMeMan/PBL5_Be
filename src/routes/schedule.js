const scheduleController = require('../controllers/schedule')
import controller from '../controllers'
const router = require('express').Router()

router.get('/', scheduleController.getSchedulesController)

module.exports = router