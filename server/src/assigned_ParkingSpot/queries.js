const assignParkingSpotByCondoId = 'INSERT INTO assigned_parking_spot (condoid, property_id, parkingid) VALUES ($1, ' +
    '(SELECT p.property_id FROM property p, condo_unit c WHERE c.condoid = $1 AND c.property_id = p.property_id), ' +
    '(SELECT ps.parkingid FROM parking_spot ps WHERE ps.property_id = (SELECT p.property_id FROM property p, condo_unit c WHERE c.condoid = $1 ' +
    'AND c.property_id = p.property_id) AND ps.parkingid NOT IN (SELECT aps.parkingid FROM assigned_parking_spot aps) ' +
    'LIMIT 1))'

const unassignParkingSpotByCondoId = 'DELETE FROM assigned_parking_spot WHERE condoid = $1'

const getAssignedParkingSpots = 'SELECT * FROM assigned_parking_spot'

const getAssignedParkingSpotByCondoId = 'SELECT * FROM assigned_parking_spot WHERE condoid = $1'

module.exports = {
  assignParkingSpotByCondoId,
  unassignParkingSpotByCondoId,
  getAssignedParkingSpotByCondoId,
  getAssignedParkingSpots
}
