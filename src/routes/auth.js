import * as controles from '../controllers'
const { verifyToken } = require('../middlewears/verify_token')
const router = require('express').Router()

router.post('/register', controles.register)
router.post('/login', controles.login)
router.use(verifyToken)
router.post('/change_password', controles.changePasswordController)
module.exports = router