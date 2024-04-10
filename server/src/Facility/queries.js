const getAllParkingSpots = 'SELECT * FROM parking_spot;'

const getParkingSpotById = 'SELECT * FROM facility WHERE parkingid = $1;'

const getFacilityByCompanyId = 'SELECT * FROM facility WHERE property_id = (SELECT property_id FROM property WHERE companyid = $1);'

const getFacilityByPropertyId = 'SELECT * FROM facility WHERE property_id = $1;'

const getFacilityByFacilityId = 'SELECT * FROM facility WHERE facilityid = $1;'

const getFacilityByUserId = 'SELECT * FROM facility WHERE userid = $1;'

module.exports = {
  getAllParkingSpots,
  getParkingSpotById,
  getFacilityByCompanyId,
  getFacilityByPropertyId,
  getFacilityByFacilityId,
  getFacilityByUserId
}
