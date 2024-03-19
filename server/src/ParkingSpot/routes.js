const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllParkingSpots)
router.get('/getByPs/:parkingid', authenticateToken, controller.getParkingSpotById)
router.get('/getByP/:property_id', authenticateToken, controller.getParkingSpotsByPropertyId)
router.get('/getByC/:companyid', authenticateToken, controller.getParkingSpotsByCompanyId)

module.exports = router
