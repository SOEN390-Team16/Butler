const getCMCs = "SELECT * FROM condo_management_company";
const getCMCById = "SELECT * FROM condo_management_company WHERE id = $1";
const checkIfEmailExists = "SELECT * FROM condo_management_company cc WHERE cc.email = $1";
const addCMC = "INSERT INTO condo_management_company (id, email, userName) VALUES ($1, $2, $3)";
const removeCMC = "DELETE FROM condo_management_company WHERE id = $1 ";
const updateCMC = "UPDATE condo_management_company SET name = $1 WHERE id = $2";

module.exports = {
    getCMCs,
    getCMCById,
    checkIfEmailExists,
    addCMC,
    removeCMC,
    updateCMC
}