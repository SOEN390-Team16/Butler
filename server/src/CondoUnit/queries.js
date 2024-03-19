const getAllCondoUnits = 'SELECT * FROM condo_unit;'
const getCondoUnitById = 'SELECT * FROM condo_unit WHERE condoid = $1;'
const getCondoUnitByNumber = 'SELECT * FROM condo_unit WHERE condo_number = $1;'
const getCondoUnitsByPropertyId = 'SELECT * FROM condo_unit WHERE property_id = $1;'
const getCondoUnitsByCompanyId = 'SELECT * FROM condo_unit WHERE companyid = $1;'

module.exports = {
  getAllCondoUnits,
  getCondoUnitById,
  getCondoUnitsByPropertyId,
  getCondoUnitsByCompanyId,
  getCondoUnitByNumber
}
