const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/',authenticateToken, controller.getCondoOwners);
router.get('/:ownerid',authenticateToken,controller.getCondoOwnerById);
router.post('/',authenticateToken, controller.addCondoOwner);
router.patch('/:ownerid',authenticateToken, controller.updateCondoOwner);
router.delete('/:ownerid',authenticateToken, controller.removeCondoOwner);

module.exports = router;