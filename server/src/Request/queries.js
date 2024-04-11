const getAllRequests = 'SELECT * FROM request '
const getRequestByID = 'SELECT * FROM request  WHERE request_id = $1'
const getRequestsByEmpID = 'SELECT * FROM request WHERE employee_id = $1'
const getRequestsByUserID = 'SELECT * FROM request WHERE user_id = $1'
const addRequest =
  'INSERT INTO request(employee_id, user_id, description, type, status) VALUES ($1, $2, $3, $4, $5)'
const assignRequestToEmployee =
  'UPDATE request SET employee_id = $1 WHERE request_id = $2'
const updateRequestStatus =
  'UPDATE request SET status = $1 WHERE request_id = $2'
const deleteRequest = 'DELETE FROM request WHERE request_id = $1 '
const checkIfEmployeeExists = 'SELECT * FROM employee WHERE employeeid = $1'
const checkIfUserExists = 'SELECT * FROM public_user WHERE userid = $1'

module.exports = {
  getAllRequests,
  getRequestByID,
  getRequestsByEmpID,
  getRequestsByUserID,
  addRequest,
  assignRequestToEmployee,
  deleteRequest,
  checkIfEmployeeExists,
  checkIfUserExists,
  updateRequestStatus
}
