const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCondoRenters);
router.get('/:id',controller.getCondoRenterById);
router.post('/', controller.addCondoRenter);
router.patch('/:id', controller.updateCondoRenter);
router.delete('/:id', controller.removeCondoRenter);

module.exports = router;