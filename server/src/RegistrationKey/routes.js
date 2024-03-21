const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/gen/:role', authenticateToken, controller.generateRegistrationKey)
router.get('/getByKey/:key', authenticateToken, controller.getRoleByRegistrationKey)
router.patch('/', authenticateToken, controller.updateUserRoleByRegistrationKeyAndUserId)
router.delete('/:key', authenticateToken, controller.deleteRegistrationKey)

module.exports = router
