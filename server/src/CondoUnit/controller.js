const pool = require('../../db')
const queries = require('./queries')

const getCondoUnits = (req, res) => {
  const property_id = parseInt(req.query.property_id)
  const companyid = parseInt(req.query.companyid)
  if (!isNaN(property_id)) {
    console.log('Getting condo units by property_id')
    pool.query(queries.checkIfPropertyExists, [property_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        if (results.rowCount < 1) {
          return res.status(404).json({ error: 'Property not found' })
        } else {
          pool.query(queries.getCondoUnitsByPropertyId, [property_id], (error, results) => {
            if (error) {
              return res.status(500).json({ error: 'Internal Server Error' })
            } else {
              return res.status(200).json(results.rows)
            }
          })
        }
      }
    })
  } else if (!isNaN(companyid)) {
    console.log('Getting condo units by companyid')
    pool.query(queries.checkIfCompanyExists, [companyid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        if (results.rowCount < 1) {
          return res.status(404).json({ error: 'Company not found' })
        } else {
          pool.query(queries.getCondoUnitsByCompanyId, [companyid], (error, results) => {
            if (error) {
              return res.status(500).json({ error: 'Internal Server Error' })
            } else {
              return res.status(200).json(results.rows)
            }
          })
        }
      }
    })
  } else {
    console.log('Get All Condo Units')
    pool.query(queries.getCondoUnits, (error, results) => {
      if (error) {
        console.error('Error finding condo units:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        res.status(200).json(results.rows)
      }
    })
  }
}

const assignCondoUnitToUser = (req, res) => {
  console.log('Assigning Condo Unit')
  const property_id = parseInt(req.params.property_id)
  const userid = parseInt(req.params.userid)

  pool.query(queries.checkIfPropertyExists, [property_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount < 1) {
      return res.status(404).json({ error: 'Property not found' })
    } else {
      pool.query(queries.checkIfUserExists, [userid], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        } else if (results.rowCount < 1) {
          return res.status(404).json({ error: 'User not found' })
        } else {
          pool.query(queries.getUnassignedCondoUnit, [property_id], (error, results) => {
            if (error) {
              return res.status(500).json({ error: 'Internal Server Error' })
            } else if (results.rowCount < 1) {
              return res.status(404).json({ error: 'Unassigned condo unit for this property not found' })
            } else {
              const unassignedCondoUnit = results.rows[0].condoid
              pool.query(queries.assignCondoUnitToUser, [userid, unassignedCondoUnit], (error, results) => {
                if (error) {
                  return res.status(500).json({ error: 'Internal Server Error' })
                } else {
                  return res.status(201).json({ message: 'Condo Unit Assigned Successfully' })
                }
              })
            }
          })
        }
      })
    }
  })
}

const getCondoUnitByUserId = (req, res) => {
  console.log('Getting Condo Unit By User Id')
  const userid = parseInt(req.params.userid)
  pool.query(queries.getCondoUnitByUserId, [userid], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getCondoUnitById = (req, res) => {
  console.log('Get a specific condo unit profile')

  const condoid = parseInt(req.params.condoid)

  pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
    if (error) {
      console.error('Error fetching condo unit profile:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Condo unit not found' })
    } else {
      res.status(200).json(results.rows.at(0))
    }
  })
}

const addCondoUnit = (req, res) => {
  console.log('Add a Condo Unit')
  const { companyid, property_id, condo_number, size, occupant_type, total_fees } = req.body

  pool.query(queries.checkIfCondoUnitExistsByDetails, [companyid, property_id, condo_number], (error, results) => {
    if (error) {
      console.error('Error checking condo unit existence:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount > 0) {
      return res.status(400).json({ error: 'Condo unit already exists' })
    } else {
      pool.query(queries.addCondoUnit, [companyid, property_id, condo_number, size, occupant_type, total_fees], (error, results) => {
        if (error) {
          console.error('Error adding condo unit:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(201).json({ message: 'Condo unit added successfully' })
        }
      })
    }
  })
}

const removeCondoUnit = (req, res) => {
  console.log('Remove a Condo Unit')

  const condoid = parseInt(req.params.condoid)

  pool.query(queries.removeCondoUnit, [condoid], (error, results) => {
    if (error) {
      console.error('Error removing condo unit:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Condo unit removed successfully' })
    }
  })
}

const updateCondoUnit = (req, res) => {
  console.log('Update a Condo Unit')

  const condoid = parseInt(req.params.condoid)
  const { companyid, property_id, condo_number, size, occupant_type, total_fees } = req.body

  pool.query(queries.checkIfCondoUnitExists, [condoid], (error, results) => {
    if (error) {
      console.error('Error checking condo unit existence:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Condo unit not found' })
    } else {
      pool.query(queries.updateCondoUnit, [companyid, property_id, condo_number, size, occupant_type, total_fees, condoid], (error, results) => {
        if (error) {
          console.error('Error updating condo unit:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json({ message: 'Condo unit updated successfully' })
        }
      })
    }
  })
}

const calculateTotalCondoFee = (req, res) => {
  console.log('Calculate Total Condo Fee')

  const condoid = parseInt(req.params.condoid)

  pool.query(queries.getCondoFeePerSqrft, [condoid], (error, feeResults) => {
    if (error) {
      console.error('Error fetching condo fee:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (feeResults.rowCount === 0) {
      return res.status(404).json({ error: 'Condo unit not found' })
    } else {
      const condoInformation = feeResults.rows[0]
      const condoSize = condoInformation.size
      const feePerSquareFoot = condoInformation.condo_fee_per_sqrft
      const CondoFee = condoSize * feePerSquareFoot

      pool.query(queries.getCondoParkingFee, [condoid], (parkingError, parkingResults) => {
        if (parkingError) {
          console.error('Error fetching parking fee:', parkingError)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        const parkingFee = parkingResults.rows.length > 0 ? parkingResults.rows[0].parking_fee : 0

        pool.query(queries.getCondoLockerFee, [condoid], (lockerError, lockerResults) => {
          if (lockerError) {
            console.error('Error fetching locker fee:', lockerError)
            return res.status(500).json({ error: 'Internal Server Error' })
          }
          const lockerFee = lockerResults.rows.length > 0 ? lockerResults.rows[0].locker_fee : 0

          res.status(200).json({
            'Condo Size': condoSize,
            'Fee Per Square Foot': feePerSquareFoot,
            'Condo Fee': CondoFee,
            'Additional Fees': {
              'Parking Fee': parkingFee,
              'Locker Fee': lockerFee
            },
            'Total Additional Fees': parkingFee + lockerFee,
            'Total Condo Fee': CondoFee + parkingFee + lockerFee
          })
        })
      })
    }
  })
}

module.exports = {
  getCondoUnits,
  getCondoUnitById,
  getCondoUnitByUserId,
  addCondoUnit,
  removeCondoUnit,
  updateCondoUnit,
  calculateTotalCondoFee,
  assignCondoUnitToUser
}
