const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/totalFees/:property_id', authenticateToken, controller.getTotalCondoFeesCollected)
router.get('/totalCosts/:property_id/:year?', authenticateToken, controller.getTotalOperationCosts)
router.get('/annualReport/:property_id/:year', authenticateToken, controller.getAnnualReport)
router.get('/getEverythingByP/:property_id/:year', authenticateToken, controller.getEverythingAtOnceByPropertyId)
router.get('/getEverythingByC/:companyid/:year', authenticateToken, controller.getEverythingAtOnceByCompanyId)

module.exports = router
