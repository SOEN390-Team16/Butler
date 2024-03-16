const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require('../auth/tokenValidator');
const router = Router();

router.get('/', authenticateToken, controller.);
router.get('/:condoid', authenticateToken, controller.);
router.post('/', controller.addCondoUnit);
router.patch('/:condoid', authenticateToken, controller.);
router.delete('/:condoid', authenticateToken, controller.);

module.exports = router;