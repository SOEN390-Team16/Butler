const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/',authenticateToken, controller.getCondoOwners);
router.get('/:id',authenticateToken,controller.getCondoOwnerById);
router.post('/',authenticateToken, controller.addCondoOwner);
router.patch('/:id',authenticateToken, controller.updateCondoOwner);
router.delete('/:id',authenticateToken, controller.removeCondoOwner);

module.exports = router;