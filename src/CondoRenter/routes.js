const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCondoRenters);
router.get('/:id',controller.getCondoRenterById);
router.post('/', controller.addCondoRenter);

module.exports = router;