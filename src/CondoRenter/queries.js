const getCondoRenters = "SELECT * FROM CondoRenter";
const getCondoRenterById = "SELECT * FROM CondoRenter WHERE id = $1";
const checkIfEmailExists = "SLECT * FROM CondoRenter cr WHERE cr.email = $1";
const addCondoRenter = "INSERT INTO CondoRenter(name, email, age,  dob) VALUES ($1, $2, $3, $4)"

module.exports = {
    getCondoRenters,
    getCondoRenterById,
    checkIfEmailExists,
    addCondoRenter
}