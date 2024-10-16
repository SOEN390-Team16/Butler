const assignLockerByUserId = 'INSERT INTO assigned_locker (condoid, propertyid, lockerid, userid)' +
    'SELECT\n' +
    '   c.condoid,\n' +
    '   p.property_id,\n' +
    '   l.lockerid,\n' +
    '   $1\n' +
    'FROM\n' +
    '   property p\n' +
    '   INNER JOIN condo_unit c ON c.property_id = p.property_id\n' +
    '   INNER JOIN locker l ON l.property_id = p.property_id\n' +
    'WHERE\n' +
    '   c.userid = $1\n' +
    '   AND l.lockerid NOT IN (SELECT  al.lockerid FROM assigned_locker al)\n' +
    'LIMIT 1;'

const assignLockerByCondoId = 'INSERT INTO assigned_locker (condoid, propertyid, lockerid, userid)' +
    'SELECT\n' +
    '    $1,\n' +
    '    p.property_id,\n' +
    '    l.lockerid,\n' +
    '    c.userid\n' +
    'FROM\n' +
    '    property p\n' +
    '    INNER JOIN condo_unit c ON c.property_id = p.property_id\n' +
    '    INNER JOIN locker l ON l.property_id = p.property_id\n' +
    'WHERE\n' +
    '    c.condoid = $1\n' +
    '    AND l.lockerid NOT IN (SELECT al.lockerid FROM assigned_locker al)\n' +
    'LIMIT 1;'

const unassignLockerByUserId = 'DELETE FROM assigned_locker WHERE userid = $1'

const getAssignedLockers = 'SELECT * FROM assigned_locker'
const getAssignedLockersByPropertyId = 'SELECT * FROM assigned_locker WHERE property_id = $1;'
const getAssignedLockersByCompanyId = 'SELECT al.*\n' +
    'FROM assigned_locker al\n' +
    'JOIN property p ON al.property_id = p.property_id\n' +
    'JOIN condo_management_company cmc ON p.companyid = cmc.companyid\n' +
    'WHERE cmc.companyid = $1\n' +
    'ORDER BY al.property_id DESC'
const getAssignedLockersByCondoId = 'SELECT * FROM assigned_locker WHERE condoid = $1'
const getAssignedLockersByLockerId = 'SELECT * FROM assigned_locker WHERE lockerid = $1'

const getAssignedLockerByUserId = 'SELECT * FROM assigned_locker WHERE userid = $1'

module.exports = {
  assignLockerByUserId,
  assignLockerByCondoId,
  unassignLockerByUserId,
  getAssignedLockerByUserId,
  getAssignedLockersByPropertyId,
  getAssignedLockersByCompanyId,
  getAssignedLockersByLockerId,
  getAssignedLockersByCondoId,
  getAssignedLockers
}
