const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require('../auth/tokenValidator');
const router = Router();

router.get('/p-c', authenticateToken, controller.getAllParkingCondoPairs);
router.get('/l-c', authenticateToken, controller.getAllLockerCondoPairs);
router.get('/p/:condoid', authenticateToken, controller.getParkingByCondoId);
router.get('/l/:condoid', authenticateToken, controller.getLockerByCondoId);
router.get('/c/:parkingid', authenticateToken, controller.getCondoByParkingId);
router.get('/c/:lockerid', authenticateToken, controller.getCondoByLockerId);
router.post('/p-c', authenticateToken, controller.addParkingCondoPair);
router.post('/l-c', authenticateToken, controller.addLockerCondoPair);
router.delete('/p-c/:condoid', authenticateToken, controller.removeParkingCondoPair);
router.delete('/l-c/:condoid', authenticateToken, controller.removeLockerCondoPair);

module.exports = router;