const getPublicUsers = "SELECT * FROM public_user";
const getPublicUserById = "SELECT * FROM public_user WHERE userid = $1";
const checkIfEmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1";
const addPublicUser =
  "INSERT INTO public_user VALUES ($1, $2, $3, $4, $5, $6, $7)";

module.exports = {
  getPublicUsers,
  getPublicUserById,
  checkIfEmailExists,
  addPublicUser,
};
