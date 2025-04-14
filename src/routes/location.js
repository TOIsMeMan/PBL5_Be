const locationController = require('../controllers/location')
const router = require('express').Router()

router.get('/', locationController.searchLocationController)

module.exports = router