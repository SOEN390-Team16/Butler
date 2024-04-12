const getProperties = 'SELECT * FROM property;'
const getPropertyById = 'SELECT pp.property_id, pp.companyid, pp.property_name, pp.unit_count, pp.parking_count, pp.locker_count, pp.address FROM property pp WHERE pp.property_id = $1;'
const getPropertyByCompanyId = 'SELECT * FROM property pp WHERE pp.companyid = $1;'
const checkIfCompanyExists = 'SELECT * FROM condo_management_company cmc WHERE cmc.companyid = $1;'
const checkIfPropertyNameExists = 'SELECT * FROM property pp WHERE pp.property_name = $1;'
const addProperty = 'INSERT INTO property (companyid, property_name, unit_count, parking_count, locker_count, address) VALUES ($1, $2, $3, $4, $5, $6);'
const updateCondoDetails = 'INSERT INTO condo_unit (property_id, companyid, condo_number) VALUES ($1, $2, $3);'
const updateParkingDetails = 'INSERT INTO parking_spot (property_id, companyid, parking_number) VALUES ($1, $2, $3);'
const updateLockerDetails = 'INSERT INTO locker (property_id, companyid, locker_number) VALUES ($1, $2, $3);'
const removeProperty = 'DELETE FROM property WHERE property_id = $1;'
const getPropertyByName = 'SELECT * FROM property WHERE property_name = $1;'
module.exports = {
  getProperties,
  getPropertyById,
  getPropertyByCompanyId,
  getPropertyByName,
  checkIfCompanyExists,
  checkIfPropertyNameExists,
  addProperty,
  updateCondoDetails,
  updateLockerDetails,
  updateParkingDetails,
  removeProperty
}
