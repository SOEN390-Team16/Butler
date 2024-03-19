const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllLockers)
router.get('/getByL/:lockerid', authenticateToken, controller.getLockerById)
router.get('/getByP/:propertyid', authenticateToken, controller.getLockersByPropertyId)
router.get('/getByC/:companyid', authenticateToken, controller.getLockersByCompanyId)
router.post('/', authenticateToken, controller.addLocker)
router.delete('/:lockerid', authenticateToken, controller.removeLockerByLockerId)

module.exports = router
