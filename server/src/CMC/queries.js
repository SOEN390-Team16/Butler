const getCMCs = 'SELECT companyID, company_name, email, password FROM  condo_management_company;'
const getCMCById = 'SELECT companyID, company_name, email, password, role FROM condo_management_company WHERE companyID = $1;'
const checkIfCMCEmailExists = 'SELECT * FROM condo_management_company cmc WHERE cmc.email = $1;'
const addCMC = 'INSERT INTO condo_management_company(company_name, email, password) VALUES ($1, $2, $3);'
const removeCMC = 'DELETE FROM condo_management_company WHERE companyID = $1;'
const checkIfPropertyExists = 'SELECT * FROM property WHERE property_id = $1;'
const getCMCByPropertyId = 'SELECT cmc.*\n' +
    'FROM condo_management_company cmc\n' +
    'INNER JOIN property p ON cmc.companyid = p.companyid\n' +
    'WHERE p.property_id = $1'

module.exports = {
  getCMCs,
  getCMCById,
  checkIfCMCEmailExists,
  addCMC,
  removeCMC,
  checkIfPropertyExists,
  getCMCByPropertyId
}
