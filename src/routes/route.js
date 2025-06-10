import { getRouteController } from '../controllers'
import { isAdmin } from '../middlewears/verify_role'
import { verifyToken } from '../middlewears/verify_token'
const router = require('express').Router()

router.use(verifyToken)
router.use(isAdmin)
router.post('/', getRouteController)

module.exports = router