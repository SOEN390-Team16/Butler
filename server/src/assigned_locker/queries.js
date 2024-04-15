const assignLockerByUserId = 'INSERT INTO assigned_locker (userid, property_id, lockerid) VALUES ($1, ' +
    '(SELECT p.property_id FROM property p, active_registration_key ark, condo_unit cu WHERE ark.userid = $1 AND ' +
    'ark.condoid = cu.condoid AND p.property_id = cu.property_id),(SELECT l.lockerid FROM locker l ' +
    'WHERE l.property_id = (SELECT p.property_id FROM property p, active_registration_key ark, condo_unit cu ' +
    'WHERE ark.userid = $1 AND ark.condoid = cu.condoid AND p.property_id = cu.property_id) AND l.lockerid NOT IN ' +
    '(SELECT al.lockerid FROM assigned_locker al)LIMIT 1))'

const unassignLockerByUserId = 'DELETE FROM assigned_locker WHERE userid = $1'

const getAssignedLockers = 'SELECT * FROM assigned_locker'
const getAssignedLockersByPropertyId = 'SELECT * FROM assigned_locker WHERE property_id = $1;'
const getAssignedLockersByCompanyId = 'SELECT al.*\n' +
    'FROM assigned_locker al\n' +
    'JOIN property p ON al.property_id = p.property_id\n' +
    'JOIN condo_management_company cmc ON p.companyid = cmc.companyid\n' +
    'WHERE cmc.companyid = $1\n' +
    'ORDER BY al.property_id DESC'

const getAssignedLockerByUserId = 'SELECT * FROM assigned_locker WHERE userid = $1'

module.exports = {
  assignLockerByUserId,
  unassignLockerByUserId,
  getAssignedLockerByUserId,
  getAssignedLockersByPropertyId,
  getAssignedLockersByCompanyId,
  getAssignedLockers
}
