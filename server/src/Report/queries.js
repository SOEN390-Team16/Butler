const getTotalCondoFeesCollected = 'SELECT SUM(total_fees * 12) AS collected_fees FROM condo_unit cu WHERE cu.property_id = $1'
const getTotalOperationCostsByYear = 'SELECT SUM(cost) AS total_costs FROM operation op WHERE property_id = $1 AND date_part(\'year\', op.date) = $2'
const getTotalOperationCosts = 'SELECT SUM(cost) AS total_costs FROM operation WHERE property_id = $1'
const getAnnualReport = 'SELECT (SELECT SUM(total_fees * 12) FROM condo_unit WHERE property_id = $1) - ' +
    '(SELECT SUM(cost) FROM operation op WHERE op.property_id = $1 AND date_part(\'year\', op.date) = $2) AS annual_report'
const checkIfPropertyExists = 'SELECT * FROM property WHERE property_id = $1'
const getEverythingAtOnce = 'SELECT ( SELECT SUM(cost) FROM operation op WHERE op.property_id = $1 AND ' +
    'date_part(\'year\', op.date) = $2) AS total_operation_cost, ' +
    '(SELECT SUM(total_fees * 12) FROM condo_unit cu WHERE cu.property_id = $1 ) AS total_collected_fees, ' +
    '(SELECT (SELECT SUM(total_fees * 12) FROM condo_unit cu WHERE cu.property_id = $1 ) - (SELECT SUM(cost) ' +
    'FROM operation op WHERE op.property_id = $1 AND date_part(\'year\', op.date) = $2)) AS annual_report'

module.exports = {
  getTotalCondoFeesCollected,
  getTotalOperationCostsByYear,
  getTotalOperationCosts,
  getAnnualReport,
  checkIfPropertyExists,
  getEverythingAtOnce
}
