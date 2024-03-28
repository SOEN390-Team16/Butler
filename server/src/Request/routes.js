const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getAllRequests)
router.get('/:reqid', authenticateToken, controller.getRequestByID)
router.get('/:empid', authenticateToken, controller.getRequestsByEmpID)
router.get('/:userid', authenticateToken, controller.getRequestsByUserID)
router.post('/', authenticateToken, controller.addRequest)
router.patch(
  '/:reqid/assign',
  authenticateToken,
  controller.assignRequestToEmployee
)
router.patch(
  '/:reqid/status',
  authenticateToken,
  controller.updateRequestStatus
)
router.delete('/:reqid', authenticateToken, controller.deleteRquest)

module.exports = router
