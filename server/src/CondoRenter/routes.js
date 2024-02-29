const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/', authenticateToken, controller.getCondoRenters);
router.get('/:renterid', authenticateToken, controller.getCondoRenterById);
router.post('/', controller.addCondoRenter);
router.patch('/:renterid', authenticateToken, controller.updateCondoRenter);
router.delete('/:renterid', authenticateToken, controller.removeCondoRenter);

module.exports = router;