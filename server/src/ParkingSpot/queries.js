const getAllParkingSpots = 'SELECT * FROM parking_spot'

const getParkingSpotById = 'SELECT * FROM parking_spot WHERE parkingid = $1'

const getParkingSpotsByCompanyId = 'SELECT * FROM parking_spot WHERE companyid = $1'

const getParkingSpotsByPropertyId = 'SELECT * FROM parking_spot WHERE property_id = $1'

module.exports = {
  getAllParkingSpots,
  getParkingSpotById,
  getParkingSpotsByCompanyId,
  getParkingSpotsByPropertyId
}
