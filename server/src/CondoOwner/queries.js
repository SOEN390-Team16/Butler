const getCondoOwners = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
    "co.condoOID FROM public_user pu, condo_owner co WHERE pu.userID = co.condoOID";
const getCondoOwnerById = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture," + 
"co.condoOID FROM public_user pu JOIN condo_owner co ON pu.userid = co.userid WHERE co.condoOID = $1" 
const checkIfEmailExists = "SELECT * FROM public_user pu WHERE pu.email = $1";
const addCondoOwner = "INSERT INTO condo_owner(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email = $1));";
const removeCondoOwner = "DELETE FROM condo_owner WHERE condoOID = $1"

module.exports = {
    getCondoOwners,
    getCondoOwnerById,
    checkIfEmailExists,
    addCondoOwner,
    removeCondoOwner
}