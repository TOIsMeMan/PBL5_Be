const bookingController = require('../controllers/booking')
const verifyToken = require('../middleware/verifyToken')
const router = require('express').Router()

router.post('/detail', bookingController.getBookingByIdController)
router.post('/', bookingController.sendBookingController)
router.use(verifyToken)
router.post('/get_all', bookingController.getAllBookingController)

module.exports = router