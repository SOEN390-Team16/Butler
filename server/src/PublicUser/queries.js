const getPublicUsers = "SELECT * FROM public_user";
const getPublicUserById = "SELECT * FROM public_user WHERE id = $1";
const checkIfEmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1";
const addPublicUser = "INSERT INTO public_user(first_name, last_name, email, password, profile_picture) VALUES ($1, $2, $3, $4, $5)"

module.exports = {
    getPublicUsers,
    getPublicUserById,
    checkIfEmailExists,
    addPublicUser
}