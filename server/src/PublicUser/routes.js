const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getPublicUsers);
router.get('/:userid',controller.getPublicUserById);
router.post('/', controller.addPublicUser);
router.patch('/:userid', controller.updatePublicUser);
router.delete('/:userid', controller.removePublicUser);

module.exports = router;