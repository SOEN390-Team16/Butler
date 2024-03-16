const {Router} = require('express');
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/', authenticateToken,controller.getCondoUnits);
router.get('/:condoid', authenticateToken, controller.getCondoUnitById);
router.post('/', authenticateToken, controller.addCondoUnit);
router.post('/:condoid', authenticateToken, controller.calculateCondoFee);
router.delete('/:condoid', authenticateToken, controller.removeCondoUnit);
router.patch('/:condoid', authenticateToken, controller.updateCondoUnit);

module.exports = router;