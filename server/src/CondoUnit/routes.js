const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getCondoUnits)
router.get('/:condoid', authenticateToken, controller.getCondoUnitById)
router.get('/:condoid/fees', authenticateToken, controller.calculateTotalCondoFee)
router.post('/', authenticateToken, controller.addCondoUnit)
router.post('/:condoid', authenticateToken, controller.calculateTotalCondoFee)
router.delete('/:condoid', authenticateToken, controller.removeCondoUnit)
router.patch('/:condoid', authenticateToken, controller.updateCondoUnit)
router.post('/send-fees', authenticateToken, controller.sendCondoFeesToOwners)

module.exports = router
