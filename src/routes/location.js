const locationController = require('../controllers/location')
const router = require('express').Router()

router.post('/', locationController.searchLocationController)

module.exports = router