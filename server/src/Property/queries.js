const getProperties = "SELECT * FROM property";
const getPropertyById = "SELECT pp.companyid, pp.propety_name, pp.unit_count, pp.parking_count, pp.locker_count, pp.adress" +
                        " FROM property pp WHERE pp.propertyid = $1";
const checkIfCompanyExists = "SELECT * FROM property pp WHERE pp.companyid = $1";
const addProperty = "INSERT INTO property(companyid, propety_name, unit_count, parking_count, locker_count, adress) VALUES ($1, $2, $3, $4, $5, $6)"
const removeProperty = "DELETE FROM property WHERE propertyid = $1"

module.exports = {
    getProperties,
    getPropertyById,
    checkIfCompanyExists,
    addProperty,
    removeProperty
}