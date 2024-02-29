const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getProperties);
router.get('/:property_id',controller.getPropertyById);
router.post('/', controller.addProperty);
router.patch('/:property_id', controller.updateProperty);
router.delete('/:property_id', controller.removeProperty);

module.exports = router;