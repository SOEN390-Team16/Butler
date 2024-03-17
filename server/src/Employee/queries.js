const getEmployees = "SELECT * FROM employee ";
const getEmployeeByID = "SELECT * FROM employee  WHERE employeeid = $1";
const getEmployeeByEmail = "SELECT * FROM employee  WHERE email = $1";
const checkIfEmpEmailExists = "SELECT * FROM employee emp WHERE emp.email = $1";
const addEmployee =
  "INSERT INTO employee(first_name, last_name, email, password, job, companyid, role) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const removeEmployee = "DELETE FROM employee WHERE employeeid = $1 ";
const checkIfCompanyExists =
  "SELECT * FROM condo_management_company WHERE companyid = $1";

module.exports = {
  getEmployees,
  getEmployeeByID,
  checkIfEmpEmailExists,
  addEmployee,
  removeEmployee,
  checkIfCompanyExists,
};
