const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAssignedParkingSpots)
router.get('/getByC/:condoid', authenticateToken, controller.getAssignedParkingSpotByCondoId)
router.post('/:condoid', authenticateToken, controller.assignParkingSpotByCondoId)
router.get('/:condoid', authenticateToken, controller.unassignParkingSpotByCondoId)

module.exports = router
