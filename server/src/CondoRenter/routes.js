const {Router} = require('express');
const controller = require('./controller')
const router = Router();

router.get('/',controller.getCondoRenters);
router.get('/:renterid',controller.getCondoRenterById);
router.post('/', controller.addCondoRenter);
router.patch('/:renterid', controller.updateCondoRenter);
router.delete('/:renterid', controller.removeCondoRenter);

module.exports = router;