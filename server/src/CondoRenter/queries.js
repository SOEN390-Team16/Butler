const getCondoRenters = "SELECT * FROM CondoRenter";
const getCondoRenterById = "SELECT * FROM CondoRenter WHERE id = $1";
const checkIfEmailExists = "SLECT * FROM CondoRenter cr WHERE cr.email = $1";
const addCondoRenter = "INSERT INTO CondoRenter(name, email, age,  dob) VALUES ($1, $2, $3, $4)"
const removeCondoRenter = "DELETE FROM CondoRenter WHERE id = $1 "
const updateCondoRenter = "UPDATE CondoRenter SET name = $1 WHERE id = $2"

module.exports = {
    getCondoRenters,
    getCondoRenterById,
    checkIfEmailExists,
    addCondoRenter,
    updateCondoRenter,
    removeCondoRenter
}