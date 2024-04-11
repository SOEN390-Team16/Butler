const { Router } = require('express');
const controller = require('./controller');
const authenticateToken = require('../auth/tokenValidator');
const router = Router();

// Use middleware to differentiate routes based on query parameters
router.get('/', authenticateToken, (req, res, next) => {
   // Check if there are unexpected query parameters
   const validParams = ['reqid', 'empid', 'userid'];
   const invalidParams = Object.keys(req.query).filter(param => !validParams.includes(param));
 
   if (invalidParams.length > 0) {
     return res.status(400).json({ error: `Invalid query parameter(s): ${invalidParams.join(', ')}` });
   }
 
   // Check if there are too many query parameters
   const expectedParamsCount = validParams.filter(param => req.query[param]).length;
   if (Object.keys(req.query).length > expectedParamsCount) {
     return res.status(400).json({ error: 'Too many query parameters provided' });
   }
  if (req.query.reqid) {
    return controller.getRequestByID(req, res, next);
  } else if (req.query.empid) {
    return controller.getRequestsByEmpID(req, res, next);
  } else if (req.query.userid) {
    return controller.getRequestsByUserID(req, res, next);
  } else {
    // If no query parameter is provided, default to getAllRequests
    return controller.getAllRequests(req, res, next);
  }
});

router.post('/', authenticateToken, controller.addRequest);
router.patch('/:request_id/assign', authenticateToken, controller.assignRequestToEmployee);
router.patch('/:request_id/status', authenticateToken, controller.updateRequestStatus);
router.patch('/:request_id/', authenticateToken, controller.updateRequest);
router.delete('/:request_id', authenticateToken, controller.deleteRquest);

module.exports = router;
