const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllParkingSpots)
router.get('/getByPs/:parkingid', authenticateToken, controller.removeParkingSpotByParkingId)
router.get('/getByP/:property_id', authenticateToken, controller.getParkingSpotsByPropertyId)
router.get('/getByC/:companyid', authenticateToken, controller.getParkingSpotsByCompanyId)
router.post('/', authenticateToken, controller.addParkingSpot)
router.delete('/:parkingid', authenticateToken, controller.removeParkingSpotByParkingId)

module.exports = router
