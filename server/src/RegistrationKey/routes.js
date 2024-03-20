const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.post('/', authenticateToken, controller.generateRegistrationKey)
router.get('/:email', authenticateToken, controller.getRegistrationKeyByEmail)
router.delete('/', controller.revokeRegistrationKeyByEmailAndCondoId)

module.exports = router
