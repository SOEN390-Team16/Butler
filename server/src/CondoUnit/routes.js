const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.get('/', authenticateToken, controller.getAllUnits);
router.get('/:condoid', authenticateToken, controller.getUnitById);
router.post('/', controller.addPublicUser);
router.patch('/:condoid', authenticateToken, controller.updateCondoUnit);
router.delete('/:condoid', authenticateToken, controller.removeCondoUnit);

module.exports = router;