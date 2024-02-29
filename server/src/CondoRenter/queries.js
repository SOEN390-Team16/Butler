const getCondoRenters =
  "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role, " +
  "r.renterid FROM public_user pu, Renter r WHERE pu.userID = r.userID;";
const getCondoRenterById =
  "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role," +
  "r.renterid FROM public_user pu JOIN renter r ON pu.userid = r.userid WHERE r.renterid = $1;";
const checkIfCREmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1;";
const addCondoRenter =
  "INSERT INTO renter(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email = $1));";
const updateParentToRenter =
  "UPDATE public_user SET role = 'renter' FROM renter WHERE renter.userid = public_user.userid;";
const removeCondoRenter = "DELETE FROM renter WHERE renterid = $1;";
const checkIfUserAlreadyExists =
  "SELECT pu.role = 'renter' FROM public_user pu WHERE pu.email = $1;";
const updateParentToPublicUser =
  "UPDATE public_user SET role = 'public_user' WHERE userid = (SELECT userid FROM renter WHERE renter.renterid = $1)";

module.exports = {
  getCondoRenters,
  getCondoRenterById,
  checkIfCREmailExists,
  addCondoRenter,
  removeCondoRenter,
  updateParentToRenter,
  checkIfUserAlreadyExists,
  updateParentToPublicUser,
};
