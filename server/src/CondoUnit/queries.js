const getCondoUnits = 'SELECT * FROM condo_unit'
const getCondoUnitById = 'SELECT cu.condoid, cu.companyid, cu.property_id, cu.condo_number, cu.size, cu.occupant_type, cu.total_fees FROM condo_unit cu WHERE cu.condoid = $1'
const getCondoUnitByUserId = 'SELECT * FROM condo_unit WHERE userid = $1'
const checkIfCondoUnitExists = 'SELECT * FROM condo_unit cu WHERE cu.condoid = $1'
const checkIfUserExists = 'SELECT * FROM public_user pu WHERE pu.userid = $1'
const checkIfCondoUnitExistsByDetails = 'SELECT * FROM condo_unit WHERE companyid = $1 AND property_id = $2 AND condo_number = $3'
const addCondoUnit = 'INSERT INTO condo_unit (companyid, property_id, condo_number, size, occupant_type, total_fees) VALUES ($1, $2, $3, $4, $5, $6)'
const removeCondoUnit = 'DELETE FROM condo_unit WHERE condoid = $1'
const updateCondoUnit = 'UPDATE condo_unit SET companyid = $1, property_id = $2, condo_number = $3, size = $4, occupant_type = $5, total_fees = $6 WHERE condoid = $7'
const getCondoFeePerSqrft = 'SELECT pp.condo_fee_per_sqrft, cu.size FROM property pp, condo_unit cu WHERE pp.property_id = cu.property_id AND cu.condoid = $1'
const getCondoParkingFee = 'SELECT p.parking_fee FROM property p, condo_unit c, active_registration_key ark, assigned_parking_spot asp WHERE ark.condoid = $1 AND asp.userid = ark.userid AND c.condoid = $1 AND c.property_id = p.property_id'
const getCondoLockerFee = 'SELECT p.locker_fee FROM property p, condo_unit c, active_registration_key ark, assigned_locker al WHERE ark.condoid = $1 AND al.userid = ark.userid AND c.condoid = $1 AND c.property_id = p.property_id'
const checkIfPropertyExists = 'SELECT * FROM property p WHERE p.property_id = $1'
const checkIfCompanyExists = 'SELECT * FROM condo_management_company cmc WHERE cmc.companyid = $1'
const getCondoUnitsByPropertyId = 'SELECT * FROM condo_unit cu WHERE cu.property_id = $1 ORDER BY condo_number DESC'
const getCondoUnitsByCompanyId = 'SELECT * FROM condo_unit cu WHERE cu.companyid = $1 ORDER BY condo_number, property_id DESC'
const assignCondoUnitToUser = 'UPDATE condo_unit SET\n' +
    '                      occupant_type = (SELECT pu.role FROM public_user pu WHERE pu.userid = $1),\n' +
    '                      userid =$1\n' +
    'WHERE condoid = $2;'

const getUnassignedCondoUnit = 'SELECT cu.condoid FROM condo_unit cu WHERE cu.property_id = $1 AND cu.userid IS NULL\n' +
    'LIMIT 1;'

module.exports = {
  getCondoUnits,
  getCondoUnitById,
  getCondoUnitByUserId,
  checkIfCondoUnitExists,
  checkIfCondoUnitExistsByDetails,
  addCondoUnit,
  removeCondoUnit,
  updateCondoUnit,
  getCondoFeePerSqrft,
  getCondoParkingFee,
  getCondoLockerFee,
  checkIfPropertyExists,
  checkIfUserExists,
  checkIfCompanyExists,
  getCondoUnitsByPropertyId,
  getCondoUnitsByCompanyId,
  getUnassignedCondoUnit,
  assignCondoUnitToUser
}
