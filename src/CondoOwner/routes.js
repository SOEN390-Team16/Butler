const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCondoOwners);
router.get('/:id',controller.getCondoOwnerById);
router.post('/', controller.addCondoOwner);

module.exports = router;