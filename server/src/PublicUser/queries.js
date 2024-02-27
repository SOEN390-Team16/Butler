const getPublicUsers = "SELECT * FROM PublicUser";
const getPublicUserById = "SELECT * FROM PublicUser WHERE id = $1";
const checkIfEmailExists = "SLECT * FROM PublicUser pu WHERE pu.email = $1";
const addPublicUser = "INSERT INTO PublicUser(name, email, age,  dob) VALUES ($1, $2, $3, $4)";

module.exports = {
    getPublicUsers,
    getPublicUserById,
    checkIfEmailExists,
    addPublicUser
}