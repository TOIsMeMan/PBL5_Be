const bookingController = require('../controllers/booking')
const { verifyToken } = require('../middlewears/verify_token')
const router = require('express').Router()

router.use(verifyToken)
router.post('/', bookingController.sendBookingController)

module.exports = router