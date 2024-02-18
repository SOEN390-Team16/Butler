const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCMCs);
router.get('/:id',controller.getCMCById);
router.post('/', controller.addCMC);

module.exports = router;