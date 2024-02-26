const getCondoRenters = "SELECT * FROM renter";
const getCondoRenterById = "SELECT * FROM renter WHERE renterid = $1";
const addCondoRenter = "INSERT INTO renter VALUES ($1, $2)";
const checkIfUserIdExists = "SELECT * FROM renter r WHERE r.userid = $1";
const updateToRenterRole =
  "UPDATE public_user SET role='renter' WHERE userid = $1";

module.exports = {
  getCondoRenters,
  getCondoRenterById,
  addCondoRenter,
  checkIfUserIdExists,
  updateToRenterRole,
};
