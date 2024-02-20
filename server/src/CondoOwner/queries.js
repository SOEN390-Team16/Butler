const getCondoOwners = "SELECT * FROM CondoOwner";
const getCondoOwnerById = "SELECT * FROM CondoOwner WHERE id = $1";
const checkIfEmailExists = "SELECT * FROM CondoOwner co WHERE co.email = $1";
const addCondoOwner = "INSERT INTO CondoOwner(name, email, age,  dob) VALUES ($1, $2, $3, $4)"

module.exports = {
    getCondoOwners,
    getCondoOwnerById,
    checkIfEmailExists,
    addCondoOwner
}