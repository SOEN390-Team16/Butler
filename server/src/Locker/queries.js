const getAllLockers = 'SELECT * FROM locker'

const getLockerById = 'SELECT * FROM locker WHERE lockerid = $1'

const getLockersByPropertyId = 'SELECT * FROM locker WHERE propertyid = $1'

const getLockersByCompanyId = 'SELECT * FROM locker WHERE companyid = $1'

module.exports = {
  getAllLockers,
  getLockerById,
  getLockersByPropertyId,
  getLockersByCompanyId
}
