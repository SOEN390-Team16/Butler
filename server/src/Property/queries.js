const getProperties = "SELECT * FROM property";
const getPropertyById = "SELECT * FROM property WHERE propertyid = $1";
const checkIfCompanyExists = "SELECT * FROM property pp WHERE pp.companyid = $1";
const addProperty = "INSERT INTO property(propertyid, companyid, propety_name, unit_count, parking_count, locker_count, adress) VALUES ($1, $2, $3, $4, $5, $6, $7)"

module.exports = {
    getProperties,
    getPropertyById,
    checkIfCompanyExists,
    addProperty
}