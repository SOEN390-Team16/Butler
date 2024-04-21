const getEmployees = `
SELECT *
FROM employee e
JOIN condo_management_company cmc ON e.companyid = cmc.companyid AND cmc.companyid = $1
JOIN property p ON p.companyid = cmc.companyid`
const getEmployeeByID = 'SELECT * FROM employee  WHERE employeeid = $1'
const addEmployee =
  'INSERT INTO employee(first_name, last_name, companyid, role, property_id) VALUES ($1, $2, $3, $4, $5)'
const removeEmployee = 'DELETE FROM employee WHERE employeeid = $1 '
const checkIfCompanyExists =
  'SELECT * FROM condo_management_company WHERE companyid = $1'
const checkIfPropertyExists = 'SELECT * FROM property WHERE property_id = $1'

module.exports = {
  getEmployees,
  getEmployeeByID,
  addEmployee,
  removeEmployee,
  checkIfCompanyExists,
  checkIfPropertyExists
}
