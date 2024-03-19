const getProperties = 'SELECT * FROM property'

const getPropertyById = 'SELECT pp.property_id, pp.companyid, pp.property_name, pp.unit_count, pp.parking_count, pp.locker_count, pp.address FROM property pp WHERE pp.property_id = $1'

const getPropertyByCondoId = 'SELECT p.* FROM property p, condo_unit c WHERE c.condoid = $1 AND p.property_id = c.propertyid '

const getPropertyByLockerId = 'SELECT p.* FROM property p, locker l WHERE l.lockerid = $1 AND p.property_id = l.propertyid'

const getPropertyByParkingId = 'SELECT p.* FROM property p, parking_spot ps WHERE ps.parkingid = $1 AND p.property_id = ps.propertyid'

const checkIfCompanyExists = 'SELECT * FROM condo_management_company cmc WHERE cmc.companyid = $1'

const checkIfPropertyNameExists = 'SELECT * FROM property pp WHERE pp.property_name = $1'

const addProperty = 'INSERT INTO property (companyid, property_name, unit_count, parking_count, locker_count, address) VALUES ($1, $2, $3, $4, $5, $6)'

const removeProperty = 'DELETE FROM property WHERE property_id = $1'

module.exports = {
  getProperties,
  getPropertyById,
  getPropertyByCondoId,
  getPropertyByLockerId,
  getPropertyByParkingId,
  checkIfCompanyExists,
  checkIfPropertyNameExists,
  addProperty,
  removeProperty
}
