const getCondoUnits = 'SELECT * FROM condo_unit'
const getCondoUnitById = 'SELECT cu.condoid, cu.companyid, cu.propertyid, cu.condo_number, cu.size, cu.occupant_type, cu.total_fees FROM condo_unit cu WHERE cu.condoid = $1'
const checkIfCondoUnitExists = 'SELECT * FROM condo_unit cu WHERE cu.condoid = $1'
const addCondoUnit = 'INSERT INTO condo_unit (condoid, companyid, propertyid, condo_number, size, occupant_type, total_fees) VALUES ($1, $2, $3, $4, $5, $6, $7)'
const removeCondoUnit = 'DELETE FROM condo_unit WHERE condoid = $1'
const updateCondoUnit = 'UPDATE condo_unit SET companyid = $1, propertyid = $2, condo_number = $3, size = $4, occupant_type = $5, total_fees = $6 WHERE condoid = $7'

module.exports = {
  getCondoUnits,
  getCondoUnitById,
  checkIfCondoUnitExists,
  addCondoUnit,
  removeCondoUnit,
  updateCondoUnit
}
