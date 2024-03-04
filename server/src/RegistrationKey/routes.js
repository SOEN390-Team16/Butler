const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require('../auth/tokenValidator')
const router = Router();

router.post('/', controller.generateRegistrationKey);
router.get('/:email', controller.getRegistrationKeyByEmail);

module.exports = router;