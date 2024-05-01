const getAllOperations = `SELECT o.operation_id, p.property_id, cost, date, type, p.property_name 
FROM Operation 
o JOIN property p on p.property_id = o.property_id
JOIN condo_management_company cmc on p.companyid = cmc.companyID AND cmc.companyid = $1;
`
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
  join condo_management_company cmc on property.companyid = cmc.companyID AND cmc.companyid = $1
  WHERE EXTRACT(YEAR FROM date) = $2
  GROUP BY property.property_id, property.property_name
  ORDER BY total_cost DESC;
`

const getCostByOperationId = 'SELECT op.cost FROM operation op WHERE op.operation_id = $1'
const setCostByOperationId = 'UPDATE operation SET cost = $1 WHERE operation_id = $2'
const getTotalOperationalCost = `
select sum(o.cost)
from operation o
JOIN property p ON p.property_id = o.property_id
JOIN condo_management_company cmc on p.companyid = cmc.companyID AND cmc.companyid = $1`
const getTotalCondoFees = 'SELECT SUM(total_fees) AS total_fees from condo_unit'

module.exports = {
  getAllOperations,
  getOperationById,
  createOperation,
  deleteOperation,
  updateOperation,
  checkIfOperationExistsByDetails,
  checkIfOperationExistsById,
  calculateTotalCostPerPropertyWithinYear,
  getCostByOperationId,
  setCostByOperationId,
  getTotalOperationalCost,
  getTotalCondoFees
}
