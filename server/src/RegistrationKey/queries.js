const checkIfRegistrationKeyAlreadyExists =
    "SELECT rk.registration_key FROM registration_key rk WHERE rk.registration_key = $1"
const assignNewRegistrationKey =
    "INSERT INTO registration_key(registration_key, condoID, userID) VALUES " +
    "($1, $2, (SELECT userID FROM public_user pu WHERE pu.email = $3));"
const updatePublicUserRole =
    "UPDATE public_user SET role = $1 WHERE userid = (SELECT userid FROM public_user pu WHERE pu.email = $2)"

module.exports = {
    checkIfRegistrationKeyAlreadyExists,
    assignNewRegistrationKey,
    updatePublicUserRole,
};