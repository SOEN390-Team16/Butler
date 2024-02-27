const getCondoOwners = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role, " +
    "co.ownerid FROM public_user pu, condo_owner co WHERE pu.userID = co.userID;"; 
const getCondoOwnerById = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, pu.role," + 
"co.ownerid FROM public_user pu JOIN condo_owner co ON pu.userid = co.userid WHERE co.ownerid = $1;"; 
const checkIfEmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1;";
const checkIfUserAlreadyExists = "SELECT pu.role = 'condo_owner' FROM public_user pu WHERE pu.email = $1;";
const addCondoOwner = "INSERT INTO condo_owner(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email = $1));" ;
const updateParent = "UPDATE public_user SET role = 'condo_owner' FROM condo_owner WHERE condo_owner.userid = public_user.userid;";
const removeCondoOwner = "DELETE FROM condo_owner WHERE ownerid = $1;";

module.exports = {
    getCondoOwners,
    getCondoOwnerById,
    checkIfEmailExists,
    addCondoOwner,
    removeCondoOwner,
    updateParent,
    checkIfUserAlreadyExists
}