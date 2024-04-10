const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.)
router.get('/getByPs/:parkingid', authenticateToken, controller.)
router.get('/getByP/:property_id', authenticateToken, controller.)
router.get('/getByC/:companyid', authenticateToken, controller.)

module.exports = router
