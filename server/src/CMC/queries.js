const getCMCs = "SELECT * FROM condo_management_company";
const getCMCById = "SELECT * FROM condo_management_company WHERE companyid = $1";
const checkIfEmailExists = "SELECT * FROM condo_management_company cc WHERE cc.email = $1";
const addCMC = "INSERT INTO condo_management_company(companyid, company_name, email, password) VALUES ($1, $2, $3, $4)"

module.exports = {
    getCMCs,
    getCMCById,
    checkIfEmailExists,
    addCMC
}