const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAssignedLockers)
router.get('/getByU/:userid', authenticateToken, controller.getAssignedLockerByUserId)
router.post('/byU/:userid', authenticateToken, controller.assignLockerByUserId)
router.post('/byC/:condoid', authenticateToken, controller.assignLockerByCondoId)
router.delete('/:userid', authenticateToken, controller.unassignLockerByUserId)

module.exports = router
