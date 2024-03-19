const getAllLockers = 'SELECT * FROM locker'

const getLockerById = 'SELECT * FROM locker WHERE lockerid = $1'

const getLockersByPropertyId = 'SELECT * FROM locker WHERE propertyid = $1'

const getLockersByCompanyId = 'SELECT * FROM locker WHERE companyid = $1'

const addLocker = 'INSERT INTO locker (property_id, companyid, locker_number) VALUES ($1, (SELECT p.companyid FROM property p WHERE p.property_id = $1 ), $2)'

const removeLockerByLockerId = 'DELETE FROM locker WHERE lockerid = $1'

module.exports = {
  getAllLockers,
  getLockerById,
  getLockersByPropertyId,
  getLockersByCompanyId,
  addLocker,
  removeLockerByLockerId
}
