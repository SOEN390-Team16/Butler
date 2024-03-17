const getEmployees = "SELECT * FROM employee ";
const getEmployeeByID = "SELECT * FROM employee  WHERE employeeid = $1";
const addEmployee =
  "INSERT INTO employee(first_name, last_name, companyid, role, property_id) VALUES ($1, $2, $3, $4, $5)";
const removeEmployee = "DELETE FROM employee WHERE employeeid = $1 ";
const checkIfCompanyExists =
  "SELECT * FROM condo_management_company WHERE companyid = $1";
const checkIfPropertyExists = "SELECT * FROM property WHERE property_id = $1";

module.exports = {
  getEmployees,
  getEmployeeByID,
  addEmployee,
  removeEmployee,
  checkIfCompanyExists,
  checkIfPropertyExists,
};
