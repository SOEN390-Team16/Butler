const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require("../auth/tokenValidator");
const router = Router();

router.post('/', authenticateToken, controller.generateAndAssignNewRegistrationKey);
router.get('/', authenticateToken, controller.getRegistrationKeys);
router.delete('/', authenticateToken, controller.revokeRegistrationKeyByUserEmail);

module.exports = router;