const getCondoRenters = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
    "r.renterid, pu.role FROM public_user pu, renter r WHERE pu.userID = r.userID";
const getCondoRenterById = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
    "r.renterid, pu.role FROM public_user pu, renter r WHERE r.renterid = $1";
const checkIfEmailExists = "SELECT pu.first_name, pu.last_name, pu.email, pu.password, pu.profile_picture, " +
    "r.renterid, pu.role FROM public_user pu, renter r WHERE pu.userID = r.userID AND pu.email = $1";
const addCondoRenter = "INSERT INTO renter(userID) VALUES ((SELECT userID FROM public_user pu WHERE pu.email= $1))"
const updateRole = "UPDATE public_user pu SET role='renter' WHERE pu.email = $1";


module.exports = {
    getCondoRenters,
    getCondoRenterById,
    checkIfEmailExists,
    addCondoRenter,
    updateRole
}