const getPublicUsers = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.role, pu.profile_picture FROM public_user pu";
const getPublicUserById = "SELECT * FROM public_user WHERE id = $1";
const checkIfPUEmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1";
const addPublicUser = "INSERT INTO public_user(name, email, age,  dob) VALUES ($1, $2, $3, $4)";

module.exports = {
    getPublicUsers,
    getPublicUserById,
    checkIfPUEmailExists,
    addPublicUser
}