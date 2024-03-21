const checkIfRegistrationKeyAlreadyExists =
    'SELECT rt.token FROM registration_token rt WHERE rt.token = $1;'
const generateRegistrationKey =
    'INSERT INTO registration_token(token, role) VALUES ($1, $2);'
const deleteRegistrationKey = 'DELETE FROM registration_token WHERE token = $1'
const getRoleByRegistrationKey = 'SELECT rt.role FROM registration_token rt WHERE rt.token = $1'
const setRole = 'UPDATE public_user SET role = $1 WHERE userid = $2'

module.exports = {
  checkIfRegistrationKeyAlreadyExists,
  generateRegistrationKey,
  deleteRegistrationKey,
  getRoleByRegistrationKey,
  setRole
}
