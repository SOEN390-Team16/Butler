const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAssignedLockers)
router.get('/getByC/:condoid', authenticateToken, controller.getAssignedLockerByCondoId)
router.post('/', authenticateToken, controller.assignLockerByCondoId)
router.delete('/:condoid', authenticateToken, controller.unassignLockerByCondoId)

module.exports = router
