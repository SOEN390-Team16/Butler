const getCondoRenters = "SELECT * FROM renter";
const getCondoRenterById = "SELECT * FROM renter WHERE id = $1";
const checkIfEmailExists = "SLECT * FROM renter r WHERE r.email = $1";
const addCondoRenter = "INSERT INTO renter(renterid) VALUES ($1, $2, $3, $4)";

module.exports = {
  getCondoRenters,
  getCondoRenterById,
  checkIfEmailExists,
  addCondoRenter,
};
