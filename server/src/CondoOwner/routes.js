const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/',authenticateToken, controller.getCondoOwners);
router.get('/:condoOID',authenticateToken,controller.getCondoOwnerById);
router.post('/',authenticateToken, controller.addCondoOwner);
router.patch('/:condoOID',authenticateToken, controller.updateCondoOwner);
router.delete('/:condoOID',authenticateToken, controller.removeCondoOwner);

module.exports = router;