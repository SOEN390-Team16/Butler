const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()


router.get('/total-cost/:company_id', authenticateToken, controller.readOperationalCosts)
router.get('/:company_id', authenticateToken, controller.getAllOperations)
router.get('/operational-budget', authenticateToken, controller.calculateOperationalBudget)
router.get('/:operation_id', authenticateToken, controller.getOperationById)
router.post('/', authenticateToken, controller.createOperation)
router.delete('/:operation_id', authenticateToken, controller.deleteOperation)
router.patch('/:operation_id', authenticateToken, controller.updateOperation)
router.get('/cost/:operation_id', authenticateToken, controller.getCostByOperationId)
router.patch('/cost/:operation_id', authenticateToken, controller.setCostByOperationId)
router.get('/operational-budget', authenticateToken, controller.calculateOperationalBudget)

module.exports = router
