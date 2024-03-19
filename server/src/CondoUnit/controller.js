const pool = require('../../db')
const queries = require('./queries')

const getAllUnits = (req, res) => {
  console.log('Getting All units.')
  pool.query(queries.getAllCondoUnits, (error, results) => {
    if (error) {
      console.error('Error finding condo units:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'condo units not found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getCondoUnitById = (req, res) => {
  console.log('Getting a unit by id')
  const condoid = parseInt(req.params.condoid)
  pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
    if (error) {
      console.error('Error finding unit by id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      res.status(400).json({ error: 'Condo Unit Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getCondoUnitsByPropertyId = (req, res) => {
  console.log('Getting condo units by property id')
  const propertyId = parseInt(req.params.propertyId)
  pool.query(queries.getCondoUnitsByPropertyId, [propertyId], (error, results) => {
    if (error) {
      console.error('Error finding unit by property id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      res.status(400).json({ error: 'Condo Units Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getCondoUnitsByCompanyId = (req, res) => {
  console.log('Getting condo units by company id')
  const companyId = parseInt(req.params.companyId)
  pool.query(queries.getCondoUnitsByCompanyId, [companyId], (error, results) => {
    if (error) {
      console.error('Error finding unit by company id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      res.status(400).json({ error: 'Condo Units Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

// check if property, locker, parking, and
// company exist before adding. Until those
// other tables are created this works fine.
const addCondoUnit = (req, res) => {
  console.log('Adding Condo Unit ')
  const { lockerid, parkingid, companyid, propertyid, size, total_fees, condo_number, occupant_type } = req.body
  pool.query(queries.getCondoUnitByNumber, [condo_number], (error, results) => {
    if (error) {
      console.error('Error finding condo unit: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount > 0) {
      res.status(400).json({ error: 'Condo Unit Already Exists' })
    } else {
      pool.query(queries.addCondoUnit,
        [lockerid, parkingid, companyid, propertyid, size, total_fees, condo_number, occupant_type],
        (error) => {
          if (error) {
            console.error('Error creating condo unit: ', error)
            res.status(500).json({ error: 'Internal Server Error' })
          } else {
            pool.query(queries.getCondoUnitByNumber, [condo_number], (error, results) => {
              if (error) {
                console.error('Error getting condo unit by condo number: ', error)
                res.status(500).json({ error: 'Internal Server Error' })
              } else {
                res.status(200).json(results.rows)
              }
            })
          }
        })
    }
  })
}

const updateCondoUnit = (req, res) => {
  console.log('Updating Condo Unit')
  const condoid = parseInt(req.params.condoid)
  const { lockerid, parkingid, condo_fee } = req.body

  if (
    !lockerid &&
      !parkingid &&
      !condo_fee
  ) {
    return res.status(400).json({ error: 'At least one field is required for updating' })
  }

  const setClauses = []
  const values = []

  if (lockerid) {
    setClauses.push('lockerid = $' + (values.length + 1))
    values.push(lockerid)
  }
  if (parkingid) {
    setClauses.push('parkingid = $' + (values.length + 1))
    values.push(parkingid)
  }
  if (condo_fee) {
    setClauses.push('condo_fee = $' + (values.length + 1))
    values.push(condo_fee)
  }

  const query = `UPDATE condo_unit SET ${setClauses.join(', ')} WHERE condoid = ${condoid}`

  pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
    if (error) {
      console.error('Error finding condo unit: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Condo Unit Not Found' })
    } else {
      pool.query(query, [...values], (error, result) => {
        if (error) {
          console.error('Error updating condo renter:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        }

        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'condo unit not found' })
        } else {
          pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
            if (error) {
              console.error('Error finding unit by id: ', error)
              res.status(500).json({ error: 'Internal Server Error' })
            }
            if (results.rowCount === 0) {
              res.status(400).json({ error: 'Condo Unit Not Found' })
            } else {
              console.log('Condo Unit Updated Successfullly')
              res.status(200).json(results.rows)
            };
          })
        }
      })
    }
  })
}

const removeCondoUnit = (req, res) => {
  console.log('remove condo unit')
  const condoid = parseInt(req.params.condoid)
  pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
    if (error) {
      console.error('Error finding unit by id')
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      res.status(400).json({ error: 'Condo Unit Not Found' })
    } else {
      pool.query(queries.removeCondoUnit, [condoid], (error) => {
        if (error) {
          console.error('Error removing condo unit')
          res.status(500).jason({ error: 'Internal Server Error' })
        } else {
          res.status(200).json({ message: 'Condo Unit Removed Successfully' })
        }
      })
    }
  })
}

module.exports = {
  getAllUnits,
  getCondoUnitById,
  getCondoUnitsByPropertyId,
  getCondoUnitsByCompanyId
}
