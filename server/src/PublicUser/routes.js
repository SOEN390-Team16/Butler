const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get('/getPublicUsers',controller.getPublicUsers);
router.get('/:id',controller.getPublicUserById);
router.post('/addPublicUser', controller.addPublicUser);

module.exports = router;
