const getProperties = "SELECT * FROM property";
const getPropertyById = "SELECT pp.property_id, pp.companyid, pp.property_name, pp.unit_count, pp.parking_count, pp.locker_count, pp.address FROM property pp WHERE pp.property_id = $1";
const checkIfCompanyExists = "SELECT * FROM property pp WHERE pp.companyid = $1";
const addProperty = "INSERT INTO property (companyid, property_name, unit_count, parking_count, locker_count, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const removeProperty = "DELETE FROM property WHERE propertyid = $1"

module.exports = {
    getProperties,
    getPropertyById,
    checkIfCompanyExists,
    addProperty,
    removeProperty
}