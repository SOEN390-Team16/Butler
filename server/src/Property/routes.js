const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getProperties);
router.get('/:propertyid',controller.getPropertyById);
router.post('/', controller.addProperty);
router.patch('/:propertyid', controller.updateProperty);
router.delete('/:propertyid', controller.removeProperty);

module.exports = router;