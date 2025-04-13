const userController = require('../controllers/user')
const { verifyToken } = require('../middlewears/verify_token')
const router = require('express').Router()


//các route không cần token
router.use(verifyToken)
//các route cần token
router.get('/', userController.getCurrentUser)

module.exports = router