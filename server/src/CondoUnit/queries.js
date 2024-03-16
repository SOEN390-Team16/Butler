const getCondoUnits = "SELECT * FROM condo_unit";
const getCondoUnitById = "SELECT cu.condoid, cu.lockerid, cu.parkingid, cu.companyid, cu.propertyid, cu.condo_size, cu.condo_fee, cu.condo_number FROM condo_unit cu WHERE cu.condoid = $1";
const checkIfCondoUnitExistsById = "SELECT * FROM condo_unit cu WHERE cu.condoid = $1";
const addCondoUnit = "INSERT INTO property (companyid, property_name, unit_count, parking_count, locker_count, address) VALUES ($1, $2, $3, $4, $5, $6)";
const removeCondoUnit  = "DELETE FROM condo_unit condoid = $1"

module.exports = {
    getCondoUnits,
    getCondoUnitById,
    checkIfCondoUnitExistsById,
    addCondoUnit,   
    removeCondoUnit
}