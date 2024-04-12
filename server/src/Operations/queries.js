const getAllOperations = 'SELECT o.operation_id, p.property_id, cost, date, type, p.property_name FROM Operation o JOIN property p on p.property_id = o.property_id'
const getOperationById = 'SELECT op.operation_id, op.property_id, op.cost, op.date, op.type from operation op WHERE op.operation_id = $1'
const createOperation = 'INSERT INTO operation(property_id, cost, date, type) VALUES ($1, $2, $3, $4)'
const deleteOperation = 'DELETE FROM operation WHERE operation_id = $1'
const updateOperation = 'UPDATE operation SET property_id = $1, cost = $2, date = $3, type = $4 WHERE operation_id = $5'
const checkIfOperationExistsByDetails = 'SELECT * FROM operation WHERE property_id = $1 AND cost = $2 AND date = $3 AND type = $4'
const checkIfOperationExistsById = 'SELECT * FROM operation op WHERE op.operation_id = $1'
const calculateTotalCostPerPropertyWithinYear = `
  SELECT property.property_id, SUM(operation.cost) AS total_cost , property.property_name
  FROM operation 
  join property ON property.property_id = operation.property_id
  WHERE EXTRACT(YEAR FROM date) = $1
  GROUP BY property.property_id, property.property_name
  ORDER BY total_cost DESC;
`

module.exports = {
  getAllOperations,
  getOperationById,
  createOperation,
  deleteOperation,
  updateOperation,
  checkIfOperationExistsByDetails,
  checkIfOperationExistsById,
  calculateTotalCostPerPropertyWithinYear
}
