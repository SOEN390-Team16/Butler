const { Router } = require('express')
const controller = require('./controller')
const filesController = require('./files/controller')
const authenticateToken = require('../auth/tokenValidator')
const { propertyExistsMiddleware } = require('./middleware')
const multer = require('multer')
const router = Router()

const upload = multer({ storage: multer.memoryStorage() })

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
router.get('/:property_id/files', authenticateToken, propertyExistsMiddleware,
  filesController.getPropertyFiles)
router.post('/:property_id/files', authenticateToken, propertyExistsMiddleware,
  upload.array('files', 5), filesController.postPropertyFiles)
router.delete('/:property_id/files/:file_id', authenticateToken, propertyExistsMiddleware,
  filesController.deletePropertyFiles)

module.exports = router
