
import { sendPaymentContoller } from '../controllers'
const router = require('express').Router()

router.post('/', sendPaymentContoller)

module.exports = router