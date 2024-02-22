const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/getCondoOwners',controller.getCondoOwners);
router.get('/:id',controller.getCondoOwnerById);
router.post('/addCondoOwner', controller.addCondoOwner);

module.exports = router;