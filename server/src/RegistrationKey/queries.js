const checkIfRegistrationKeyAlreadyExists =
    "SELECT rk.registration_key FROM registration_key rk WHERE rk.registration_key= $1;"
const generateRegistrationKey =
    "INSERT INTO registration_key(registration_key, userid, role) VALUES " +
    "($1, (SELECT userID FROM public_user pu WHERE pu.email= $2), $3);"
const getRegistrationKeyByEmail =
    "SELECT rk.registration_key FROM registration_key rk WHERE userID= (SELECT userID FROM public_user pu WHERE pu.email= $1);"

module.exports = {
    checkIfRegistrationKeyAlreadyExists,
    generateRegistrationKey,
    getRegistrationKeyByEmail
};