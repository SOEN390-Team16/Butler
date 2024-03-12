const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require('../auth/tokenValidator');
const router = Router();

router.get('/', authenticateToken, controller.getAllUnits);
router.get('/:condoid', authenticateToken, controller.getCondoUnitById);
router.post('/', controller.addCondoUnit);
router.patch('/:condoid', authenticateToken, controller.updateCondoUnit);
router.delete('/:condoid', authenticateToken, controller.removeCondoUnit);

module.exports = router;