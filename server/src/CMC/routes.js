const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCMCs);
router.get('/:companyID',controller.getCMCById);
router.post('/', controller.addCMC);
router.patch('/:companyID', controller.updateCMC);
router.delete('/:companyID', controller.removeCMC);

module.exports = router;