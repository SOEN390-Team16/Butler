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

module.exports = {
  getAllUnits,
  getCondoUnitById,
  getCondoUnitsByPropertyId,
  getCondoUnitsByCompanyId
}
