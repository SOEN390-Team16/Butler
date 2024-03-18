const getAllParkingSpots = 'SELECT * FROM parking_spot'

const getParkingSpotById = 'SELECT * FROM parking_spot WHERE parkingid = $1'

const getParkingSpotsByCompanyId = 'SELECT * FROM parking_spot WHERE companyid = $1'

const getParkingSpotsByPropertyId = 'SELECT * FROM parking_spot WHERE property_id = $1'

const addParkingSpot = 'INSERT INTO parking_spot (companyid, property_id, parking_number) VALUES($1, (SELECT p.companyid FROM property p WHERE p.property_id = $1), $2)'

const removeParkingSpotByParkingId = 'DELETE FROM parking_spot WHERE parkingid = $1'

module.exports = {
  getAllParkingSpots,
  getParkingSpotById,
  getParkingSpotsByCompanyId,
  getParkingSpotsByPropertyId,
  addParkingSpot,
  removeParkingSpotByParkingId
}
