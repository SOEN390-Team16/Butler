const checkIfRegistrationKeyAlreadyExists =
    "SELECT rk.registration_key FROM registration_key rk WHERE rk.registration_key= $1;"
const generateRegistrationKey =
    "INSERT INTO registration_key(registration_key, userid, role) VALUES " +
    "($1, (SELECT userID FROM public_user pu WHERE pu.email= $2), $3);"
const getRegistrationKeyByEmail =
    "SELECT rk.registration_key FROM registration_key rk WHERE userID= (SELECT userID FROM public_user pu WHERE pu.email= $1);"
const checkIfPublicUserExists =
    "SELECT * FROM public_user WHERE email=$1;"
const checkIfUserHasActiveRegistrationKey =
    "SELECT * FROM active_registration_key WHERE userID= (SELECT userID FROM public_user WHERE email=$1) AND condoID = $2; "
const revokeRegistrationKey =
    "DELETE FROM registration_key rk WHERE rk.userID = (SELECT userID FROM public_user WHERE email=$1) " +
    "AND rk.registration_key IN (SELECT registration_key FROM active_registration_key WHERE condoID= $2);"
const updateRoleBeforeRevoking =
    "UPDATE public_user SET role='public_user' WHERE userID= (SELECT pu.userID FROM public_user pu WHERE pu.email=$1);"

module.exports = {
    checkIfRegistrationKeyAlreadyExists,
    generateRegistrationKey,
    getRegistrationKeyByEmail,
    checkIfPublicUserExists,
    checkIfUserHasActiveRegistrationKey,
    revokeRegistrationKey,
    updateRoleBeforeRevoking
};