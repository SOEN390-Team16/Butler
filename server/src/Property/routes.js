const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getProperties)
router.get('/:property_id', authenticateToken, controller.getPropertyById)
router.get('/company/:companyid', authenticateToken, controller.getPropertyByCompanyId)
router.get('/getByC/:condoid', authenticateToken, controller.getPropertyByCondoId)
router.get('/getByL/:lockerid', authenticateToken, controller.getPropertyByLockerId)
router.get('/user/:userid', authenticateToken, controller.getPropertyByUserId)
router.get('/:parkingid', authenticateToken, controller.getPropertyByParkingId)
router.post('/', authenticateToken, controller.addProperty)
router.patch('/:property_id', authenticateToken, controller.updateProperty)
router.delete('/:property_id', authenticateToken, controller.removeProperty)

module.exports = router
