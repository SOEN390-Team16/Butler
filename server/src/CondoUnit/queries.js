const getCondoUnits = "SELECT * FROM condo_unit";
const getCondoUnitById = "SELECT cu.condoid, cu.lockerid, cu.parkingid, cu.companyid, cu.propertyid, cu.condo_size, cu.condo_fee, cu.condo_number FROM condo_unit cu WHERE cu.condoid = $1";
const checkIfCondoUnitExistsById = "SELECT * FROM condo_unit cu WHERE cu.condoid = $1";
const addCondoUnit = "INSERT INTO condo_unit (condoid, lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removeCondoUnit  = "DELETE FROM condo_unit condoid = $1";
const updateCondoUnit = "UPDATE condo_unit SET lockerid = $1, parkingid = $2, companyid = $3, propertyid = $4, condo_size = $5, condo_fee = $6, condo_number = $7 WHERE condoid = $8";

module.exports = {
    getCondoUnits,
    getCondoUnitById,
    checkIfCondoUnitExistsById,
    addCondoUnit,   
    removeCondoUnit,
    updateCondoUnit
}