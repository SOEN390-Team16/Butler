const assignParkingSpotByUserId = 'INSERT INTO assigned_parking_spot (userid, property_id, parkingid) VALUES ($1, ' +
    '(SELECT p.property_id FROM property p, active_registration_key ark, condo_unit cu WHERE ark.userid = $1 AND ' +
    'ark.condoid = cu.condoid AND p.property_id = cu.property_id),(SELECT ps.parkingid FROM parking_spot ps ' +
    'WHERE ps.property_id = (SELECT p.property_id FROM property p, active_registration_key ark, condo_unit cu ' +
    'WHERE ark.userid = $1 AND ark.condoid = cu.condoid AND p.property_id = cu.property_id)AND ps.parkingid NOT IN ' +
    '(SELECT aps.parkingid FROM assigned_parking_spot aps)LIMIT 1))'

const assignParkingSpotByCondoId = 'INSERT INTO assigned_parking_spot (condoid, propertyid, parkingid)' +
    'SELECT\n' +
    '    $1,\n' +
    '    p.property_id,\n' +
    '    ps.parkingid\n' +
    'FROM\n' +
    '    property p\n' +
    '    INNER JOIN condo_unit c ON c.property_id = p.property_id\n' +
    '    INNER JOIN parking_spot ps ON ps.property_id = p.property_id\n' +
    'WHERE\n' +
    '    c.condoid = $1\n' +
    '    AND ps.parkingid NOT IN (SELECT aps.parkingid FROM assigned_parking_spot aps)\n' +
    'LIMIT 1;'

const unassignParkingSpotByUserId = 'DELETE FROM assigned_parking_spot WHERE userid = $1'

const getAssignedParkingSpots = 'SELECT * FROM assigned_parking_spot'
const getAssignedParkingSpotsByPropertyId = 'SELECT * FROM assigned_parking_spot WHERE property_id = $1;'
const getAssignedParkingSpotsByCompanyId = 'SELECT aps.*\n' +
    'FROM assigned_parking_spot aps\n' +
    'JOIN property p ON aps.property_id = p.property_id\n' +
    'JOIN condo_management_company cmc ON p.companyid = cmc.companyid\n' +
    'WHERE cmc.companyid = $1\n' +
    'ORDER BY aps.property_id DESC\n'
const getAssignedParkingSpotsByCondoId = 'SELECT * FROM assigned_parking_spot WHERE condoid = $1'
const getAssignedParkingSpotsByParkingId = 'SELECT * FROM assigned_parking_spot WHERE parkingid = $1'

const getAssignedParkingSpotByUserId = 'SELECT * FROM assigned_parking_spot WHERE userid = $1'

module.exports = {
  assignParkingSpotByUserId,
  assignParkingSpotByCondoId,
  unassignParkingSpotByUserId,
  getAssignedParkingSpotByUserId,
  getAssignedParkingSpotsByParkingId,
  getAssignedParkingSpotsByCondoId,
  getAssignedParkingSpots,
  getAssignedParkingSpotsByPropertyId,
  getAssignedParkingSpotsByCompanyId
}
