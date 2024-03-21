const pool = require('../../db')
const queries = require('./queries')

const getAllParkingSpots = (req, res) => {
  console.log('Getting all Parking Spots.')
  pool.query(queries.getAllParkingSpots, (error, results) => {
    if (error) {
      console.error('Error finding parking spots:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'parking spots not found.' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getParkingSpotById = (req, res) => {
  console.log('Getting a parking spot by id')
  const parkingid = parseInt(req.params.parkingid)
  pool.query(queries.getParkingSpotById, [parkingid], (error, results) => {
    if (error) {
      console.error('Error finding parking spot by id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getParkingSpotsByPropertyId = (req, res) => {
  console.log('Getting parking spots by property Id')
  const property_id = parseInt(req.params.property_id)
  pool.query(queries.getParkingSpotsByPropertyId, [property_id], (error, results) => {
    if (error) {
      console.error('Error finding parking spots by property id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getParkingSpotsByCompanyId = (req, res) => {
  console.log('Getting parking spots by company Id')
  const companyid = parseInt(req.params.companyid)
  pool.query(queries.getParkingSpotsByCompanyId, [companyid], (error, results) => {
    if (error) {
      console.error('Error finding parking spots by company id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

module.exports = {
  getAllParkingSpots,
  getParkingSpotById,
  getParkingSpotsByCompanyId,
  getParkingSpotsByPropertyId
}
