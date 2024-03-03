const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();


router.get('/', authenticateToken,controller.getProperties);
router.get('/:property_id', authenticateToken, controller.getPropertyById);
router.post('/', authenticateToken, controller.addProperty);
router.patch('/:property_id', authenticateToken, controller.updateProperty);
router.delete('/:property_id', authenticateToken, controller.removeProperty);

module.exports = router;