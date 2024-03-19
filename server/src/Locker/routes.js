const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllLockers)
router.get('/getByL/:lockerid', authenticateToken, controller.getLockerById)
router.get('/getByP/:property_id', authenticateToken, controller.getLockersByPropertyId)
router.get('/getByC/:companyid', authenticateToken, controller.getLockersByCompanyId)

module.exports = router
