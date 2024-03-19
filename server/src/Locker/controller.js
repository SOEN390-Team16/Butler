const pool = require('../../db')
const queries = require('./queries')

const getAllLockers = (req, res) => {
  console.log('Getting all lockers.')
  pool.query(queries.getAllLockers, (error, results) => {
    if (error) {
      console.error('Error finding lockers:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'lockers not found.' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getLockerById = (req, res) => {
  console.log('Getting a locker by id')
  const lockerid = parseInt(req.params.lockerid)
  pool.query(queries.getLockerById, [lockerid], (error, results) => {
    if (error) {
      console.error('Error getting locker by id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Locker Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getLockersByPropertyId = (req, res) => {
  console.log('Getting lockers by property Id')
  const propertyid = parseInt(req.params.propertyid)
  pool.query(queries.getLockersByPropertyId, [propertyid], (error, results) => {
    if (error) {
      console.error('Error getting lockers by property id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Lockers Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getLockersByCompanyId = (req, res) => {
  console.log('Getting lockers by company Id')
  const companyid = parseInt(req.params.companyid)
  pool.query(queries.getLockersByCompanyId, [companyid], (error, results) => {
    if (error) {
      console.error('Error getting lockers by company id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Lockers Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

module.exports = {
  getAllLockers,
  getLockerById,
  getLockersByPropertyId,
  getLockersByCompanyId
}
