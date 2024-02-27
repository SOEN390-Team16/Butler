const getCMCs = "SELECT * FROM CondoCompany";
const getCMCById = "SELECT * FROM CondoCompany WHERE id = $1";
const checkIfCMCEmailExists = "SELECT * FROM condo_management_company cmc WHERE cmc.email = $1";
const addCMC = "INSERT INTO CondoCompany(name, email, age,  dob) VALUES ($1, $2, $3, $4)"

module.exports = {
    getCMCs,
    getCMCById,
    checkIfCMCEmailExists,
    addCMC
}