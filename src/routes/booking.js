const bookingController = require('../controllers/booking')
const router = require('express').Router()

router.post('/detail', bookingController.getBookingByIdController)
router.post('/get_all', bookingController.getAllBookingController)
router.post('/', bookingController.sendBookingController)

module.exports = router