const getCondoOwners = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
    "co.ownerid, pu.role FROM public_user pu, condo_owner co WHERE pu.userID = co.userID";
const getCondoOwnerById = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
"co.ownerid, pu.role FROM public_user pu, condo_owner co WHERE co.ownerid = $1";
const checkIfEmailExists = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
    "co.ownerid, pu.role FROM public_user pu, condo_owner co WHERE pu.userID = co.userID AND pu.email = $1";
const addCondoOwner = "INSERT INTO condo_owner(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email= $1))"
const updateRole = "UPDATE public_user pu SET role='condo_owner' WHERE pu.email = $1";

module.exports = {
    getCondoOwners,
    getCondoOwnerById,
    checkIfEmailExists,
    addCondoOwner,
    updateRole
}