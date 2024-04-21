const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/:company_id', authenticateToken, controller.getEmployees)
router.get('/:empid', authenticateToken, controller.getEmployeeByID)
router.post('/', controller.addEmployee)
router.patch('/:empid', authenticateToken, controller.updateEmployee)
router.delete('/:empid', authenticateToken, controller.removeEmployee)

module.exports = router
