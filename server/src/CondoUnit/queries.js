const getAllCondoUnits = "SELECT * FROM condo_unit;";

const getCondoUnitById = "SELECT * FROM condo_unit WHERE condoid = $1;";

const getCondoUnitByNumber = "SELECT * FROM condo_unit WHERE condo_number = $1;";

const addCondoUnit = "INSERT INTO condo_unit(lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number) VALUES ($1, $2, $3, $4, $5, $6, $7);"

const removeCondoUnit = "DELETE FROM condo_unit WHERE condoid = $1;";


module.exports = {
    getAllCondoUnits,
    getCondoUnitById,
    getCondoUnitByNumber,
    addCondoUnit,
    removeCondoUnit
}