const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCMCs);
router.get('/:id',controller.getCMCById);
router.post('/', controller.addCMC);
router.patch('/:id', controller.updateCMC);
router.delete('/:id', controller.removeCMC);

module.exports = router;