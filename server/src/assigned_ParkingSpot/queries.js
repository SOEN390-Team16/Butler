const assignParkingSpotByUserId = 'INSERT INTO assigned_parking_spot (userid, property_id, parkingid) VALUES ($1, ' +
    '(SELECT p.property_id FROM property p, active_registration_key ark, condo_unit cu WHERE ark.userid = $1 AND ' +
    'ark.condoid = cu.condoid AND p.property_id = cu.property_id),(SELECT ps.parkingid FROM parking_spot ps ' +
    'WHERE ps.property_id = (SELECT p.property_id FROM property p, active_registration_key ark, condo_unit cu ' +
    'WHERE ark.userid = $1 AND ark.condoid = cu.condoid AND p.property_id = cu.property_id)AND ps.parkingid NOT IN ' +
    '(SELECT aps.parkingid FROM assigned_parking_spot aps)LIMIT 1))'

const unassignParkingSpotByUserId = 'DELETE FROM assigned_parking_spot WHERE userid = $1'

const getAssignedParkingSpots = 'SELECT * FROM assigned_parking_spot'

const getAssignedParkingSpotByUserId = 'SELECT * FROM assigned_parking_spot WHERE userid = $1'

module.exports = {
  assignParkingSpotByUserId,
  unassignParkingSpotByUserId,
  getAssignedParkingSpotByUserId,
  getAssignedParkingSpots
}
