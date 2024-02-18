const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getPublicUsers);
router.get('/:id',controller.getPublicUserById);
router.post('/', controller.addPublicUser);

module.exports = router;