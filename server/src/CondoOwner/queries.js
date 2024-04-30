const getCondoOwners =
  'SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role, ' +
  'co.ownerid, pu.userid FROM public_user pu, condo_owner co WHERE pu.userID = co.userID;'
const getCondoOwnerById =
  'SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role,' +
  'co.ownerid, pu.userid FROM public_user pu JOIN condo_owner co ON pu.userid = co.userid WHERE co.ownerid = $1;'
const checkIfCOEmailExists = 'SELECT * FROM public_user pu WHERE pu.email = $1;'
const checkIfUserAlreadyExists =
  "SELECT pu.role = 'condo_owner' OR pu.role = 'renter' FROM public_user pu WHERE pu.email = $1;"
const addCondoOwner =
  'INSERT INTO condo_owner(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email = $1));'
const updateParentToOwner =
  "UPDATE public_user SET role = 'condo_owner' FROM condo_owner WHERE condo_owner.userid = public_user.userid;"
const updateParentToPublicUser =
  "UPDATE public_user SET role = 'public_user' WHERE userid = (SELECT userid FROM condo_owner WHERE condo_owner.ownerid = $1)"
const removeCondoOwner = 'DELETE FROM condo_owner WHERE ownerid = $1;'

module.exports = {
  getCondoOwners,
  getCondoOwnerById,
  checkIfCOEmailExists,
  addCondoOwner,
  removeCondoOwner,
  updateParentToOwner,
  checkIfUserAlreadyExists,
  updateParentToPublicUser
}
