const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/', authenticateToken, controller.getCMCs);
router.get('/:companyID', authenticateToken, controller.getCMCById);
router.post('/', controller.addCMC);
router.patch('/:companyID', authenticateToken, controller.updateCMC);
router.delete('/:companyID',authenticateToken, controller.removeCMC);

module.exports = router;