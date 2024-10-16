const getPublicUsers = 'SELECT * FROM public_user '
const getPublicUserById = 'SELECT pu.userid, pu.first_name, pu.last_name, pu.email, pu.password, pu.role, pu.profile_picture ' +
                            'FROM public_user pu WHERE pu.userID = $1'
const checkIfPUEmailExists = 'SELECT * FROM public_user pu WHERE pu.email = $1'
const addPublicUser = 'INSERT INTO public_user(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)'
const removePublicUser = 'DELETE FROM public_user WHERE userid = $1 '
const getPublicUserByEmail = 'SELECT * FROM public_user WHERE email = $1'

module.exports = {
  getPublicUsers,
  getPublicUserById,
  checkIfPUEmailExists,
  addPublicUser,
  removePublicUser,
  getPublicUserByEmail
}
