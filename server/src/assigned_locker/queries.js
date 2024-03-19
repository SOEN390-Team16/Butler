const assignLockerByCondoId = 'INSERT INTO assigned_locker (condoid, property_id, lockerid) VALUES ($1, ' +
    '(SELECT p.property_id FROM property p, condo_unit c WHERE c.condoid = $1 AND c.property_id = p.property_id), ' +
    '(SELECT l.lockerid FROM locker l WHERE l.property_id = (SELECT p.property_id FROM property p, condo_unit c WHERE c.condoid = $1 ' +
    'AND c.property_id = p.property_id) AND l.lockerid NOT IN (SELECT al.lockerid FROM assigned_locker al) ' +
    'LIMIT 1))'

const unassignLockerByCondoId = 'DELETE FROM assigned_locker WHERE condoid = $1'

const getAssignedLockers = 'SELECT * FROM assigned_locker'

const getAssignedLockerByCondoId = 'SELECT * FROM assigned_locker WHERE condoid = $1'

module.exports = {
  assignLockerByCondoId,
  unassignLockerByCondoId,
  getAssignedLockerByCondoId,
  getAssignedLockers
}
