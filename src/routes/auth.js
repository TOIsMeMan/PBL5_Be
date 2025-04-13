import * as controles from '../controllers'
const router = require('express').Router()

router.post('/register', controles.register)
router.post('/login', controles.login)

module.exports = router