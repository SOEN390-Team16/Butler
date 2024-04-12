const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllFacilities)
router.get('/property/:propertyid', authenticateToken, controller.getFacilityByPropertyId)
router.get('/:facilityid', authenticateToken, controller.getFacilityById)
router.post('/', authenticateToken, controller.addFacility)
router.delete('/:facilityid', authenticateToken, controller.removeFacility)
router.patch('/:facilityid', authenticateToken, controller.updateFacility)

module.exports = router
