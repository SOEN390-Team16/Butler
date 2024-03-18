const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllUnits)
router.get('/:condoid', authenticateToken, controller.getCondoUnitById)
router.get('/getByP/:property_id', authenticateToken, controller.getCondoUnitsByPropertyId)
router.get('/getByC/:companyid', authenticateToken, controller.getCondoUnitsByCompanyId)
router.post('/', authenticateToken, controller.addCondoUnit)
router.patch('/:condoid', authenticateToken, controller.updateCondoUnit)
router.delete('/:condoid', authenticateToken, controller.removeCondoUnit)

module.exports = router
