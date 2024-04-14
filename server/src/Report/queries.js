const getTotalCondoFeesCollected = 'SELECT SUM(total_fees * 12) AS collected_fees FROM condo_unit cu WHERE cu.property_id = $1'
const getTotalOperationCostsByYear = 'SELECT SUM(cost) AS total_costs FROM operation op WHERE property_id = $1 AND date_part(\'year\', op.date) = $2'
const getTotalOperationCosts = 'SELECT SUM(cost) AS total_costs FROM operation WHERE property_id = $1'
const getAnnualReport = 'SELECT (SELECT SUM(total_fees * 12) FROM condo_unit WHERE property_id = $1) - ' +
    '(SELECT SUM(cost) FROM operation op WHERE op.property_id = $1 AND date_part(\'year\', op.date) = $2) AS annual_report'
const checkIfPropertyExists = 'SELECT * FROM property WHERE property_id = $1'
const checkIfCompanyExists = 'SELECT * FROM condo_management_company WHERE companyid = $1'
const getEverythingAtOnceByPropertyId = 'SELECT ( SELECT SUM(cost) FROM operation op WHERE op.property_id = $1 AND ' +
    'date_part(\'year\', op.date) = $2) AS total_operation_cost, ' +
    '(SELECT SUM(total_fees * 12) FROM condo_unit cu WHERE cu.property_id = $1 ) AS total_collected_fees, ' +
    '(SELECT (SELECT SUM(total_fees * 12) FROM condo_unit cu WHERE cu.property_id = $1 ) - (SELECT SUM(cost) ' +
    'FROM operation op WHERE op.property_id = $1 AND date_part(\'year\', op.date) = $2)) AS annual_report'
const getEverythingAtOnceByCompanyId = 'WITH total_costs AS (\n' +
    '    SELECT SUM(cost) AS total_costs, property_id\n' +
    '    FROM operation op\n' +
    '    WHERE property_id IN (SELECT property_id FROM property WHERE companyid = $1)\n' +
    '        AND date_part(\'year\', op.date) = $2\n' +
    '    GROUP BY property_id\n' +
    '),\n' +
    'total_condo_fees AS (\n' +
    '    SELECT SUM(total_fees * 12) AS total_condo_fees, property_id\n' +
    '    FROM condo_unit cu\n' +
    '    WHERE cu.companyid = $1\n' +
    '    GROUP BY property_id\n' +
    ')\n' +
    '\n' +
    'SELECT\n' +
    '    tc.property_id,\n' +
    '    (SELECT p.property_name FROM property p WHERE p.property_id = tc.property_id AND p.companyid = $1),\n' +
    '    (COALESCE(tr.total_condo_fees, 0) - COALESCE(tc.total_costs, 0)) AS annual_report,\n' +
    '    COALESCE(tr.total_condo_fees, 0) AS total_condo_fees,\n' +
    '    COALESCE(tc.total_costs, 0) AS total_costs\n' +
    'FROM\n' +
    '    total_costs tc\n' +
    'LEFT JOIN total_condo_fees tr\n' +
    '    ON tc.property_id = tr.property_id'

module.exports = {
  getTotalCondoFeesCollected,
  getTotalOperationCostsByYear,
  getTotalOperationCosts,
  getAnnualReport,
  checkIfPropertyExists,
  checkIfCompanyExists,
  getEverythingAtOnceByPropertyId,
  getEverythingAtOnceByCompanyId
}
