const bookingController = require('../controllers/booking')
const {verifyToken} = require('../middlewears/verify_token')
import { isAdmin } from '../middlewears/verify_role'
const router = require('express').Router()

router.post('/detail', bookingController.getBookingByIdController)
router.post('/', bookingController.sendBookingController)
router.use(verifyToken)
router.post('/get_all', bookingController.getAllBookingController)
router.use(isAdmin)
router.post('/update_status', bookingController.updateBookingStatusController)
router.post('/get_all_admin', bookingController.getAllBookingAdminController)
router.post('/get_booking_by_reference', bookingController.getBookingByReferenceController)

module.exports = router