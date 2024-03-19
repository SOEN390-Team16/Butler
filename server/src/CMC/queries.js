const getCMCs = 'SELECT companyID, company_name, email, password FROM  condo_management_company;'
const getCMCById = 'SELECT companyID, company_name, email, password FROM condo_management_company WHERE companyID = $1;'
const checkIfCMCEmailExists = 'SELECT * FROM condo_management_company cmc WHERE cmc.email = $1;'
const addCMC = 'INSERT INTO condo_management_company(company_name, email, password) VALUES ($1, $2, $3);'
const removeCMC = 'DELETE FROM condo_management_company WHERE companyID = $1;'

module.exports = {
  getCMCs,
  getCMCById,
  checkIfCMCEmailExists,
  addCMC,
  removeCMC
}
