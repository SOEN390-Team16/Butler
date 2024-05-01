const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAssignedParkingSpots)
router.get('/getByU/:userid', authenticateToken, controller.getAssignedParkingSpotByUserId)
router.post('/byU/:userid', authenticateToken, controller.assignParkingSpotByUserId)
router.post('/byC/:condoid', authenticateToken, controller.assignParkingSpotByCondoId)
router.delete('/:userid', authenticateToken, controller.unassignParkingSpotByUserId)

module.exports = router
