import { getSeatStatusesController } from '../controllers'
const router = require('express').Router()

router.post('/', getSeatStatusesController)

module.exports = router