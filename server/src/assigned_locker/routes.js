const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAssignedLockers)
router.get('/getByU/:userid', authenticateToken, controller.getAssignedLockerByUserId)
router.post('/:userid', authenticateToken, controller.assignLockerByUserId)
router.delete('/:userid', authenticateToken, controller.unassignLockerByUserId)

module.exports = router
