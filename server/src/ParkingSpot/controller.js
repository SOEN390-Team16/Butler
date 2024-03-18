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
  const propertyid = parseInt(req.params.propertyid)
  pool.query(queries.getParkingSpotsByPropertyId, [propertyid], (error, results) => {
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

const addParkingSpot = (req, res) => {
  console.log('Adding a parking spot')
  const { property_id, parking_number } = req.body
  pool.query(queries.addParkingSpot, [property_id, parking_number], (error, results) => {
    if (error) {
      console.error('Error creating parking spot: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'parking spot successfully added.' })
    }
  })
}

const removeParkingSpotByParkingId = (req, res) => {
  console.log('Removing a parking spot')
  const parkingid = parseInt(req.params.parkingid)
  pool.query(queries.removeParkingSpotByParkingId, [parkingid], (error, results) => {
    if (error) {
      console.error('Error removing parking spot by parking id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      return res.status(200).json({ message: 'parking spot successfully removed.' })
    }
  })
}

module.exports = {
  getAllParkingSpots,
  getParkingSpotById,
  getParkingSpotsByCompanyId,
  getParkingSpotsByPropertyId,
  addParkingSpot,
  removeParkingSpotByParkingId
}
