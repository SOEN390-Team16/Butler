const getPublicUsers = "SELECT * FROM PublicUser";
const getPublicUserById = "SELECT * FROM PublicUser WHERE id = $1";
const checkIfEmailExists = "SLECT * FROM PublicUser pu WHERE pu.email = $1";
const addPublicUser = "INSERT INTO PublicUser(username, email, password,  token, profilepicture) VALUES ($1, $2, $3, $4, $5)"

module.exports = {
    getPublicUsers,
    getPublicUserById,
    checkIfEmailExists,
    addPublicUser
}