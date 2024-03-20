const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAssignedParkingSpots)
router.get('/getByU/:userid', authenticateToken, controller.getAssignedParkingSpotByUserId)
router.post('/:userid', authenticateToken, controller.assignParkingSpotByUserId)
router.delete('/:userid', authenticateToken, controller.unassignParkingSpotByUserId)

module.exports = router
