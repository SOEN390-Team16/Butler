const getAllFacilities = 'SELECT * FROM facility'
const getFacilityById = 'SELECT * FROM facility WHERE facility_id = $1'
const getFacilityByPropertyId = 'SELECT * FROM facility WHERE property_id = $1'
const getFacilityByUserId = 'SELECT f.* FROM facility f, condo_unit cu WHERE cu.userid = $1 AND cu.property_id = f.property_id'
const checkIfFacilityExists = 'SELECT * FROM facility WHERE facility_id = $1'
const checkIfFacilityExistsByDetails = 'SELECT * FROM facility WHERE property_id = $1 AND name = $2 AND description = $3'
const addFacility = 'INSERT INTO facility (property_id, name, description) VALUES ($1, $2, $3)'
const removeFacility = 'DELETE FROM facility WHERE facility_id = $1'
const updateFacility = 'UPDATE facility SET property_id = $1, name = $2, description = $3 WHERE facility_id = $4'

module.exports = {
  getAllFacilities,
  getFacilityById,
  getFacilityByPropertyId,
  getFacilityByUserId,
  checkIfFacilityExists,
  checkIfFacilityExistsByDetails,
  addFacility,
  removeFacility,
  updateFacility
}
