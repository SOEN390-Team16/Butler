const pool = require('../../db')
const queries = require('./queries')
const assignParkingSpotByCondoId = (req, res) => {
  console.log('Assigning a parking spot')
  const { parkingid } = req.body
  pool.query(queries.assignParkingSpotByCondoId, [parkingid], (error, results) => {
    if (error) {
      console.error('Error assigning parking spot: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'parking spot successfully assigned.' })
    }
  })
}

const unassignParkingSpotByCondoId = (req, res) => {
  console.log('Unassigning a parking spot')
  const parkingid = parseInt(req.params.parkingid)
  pool.query(queries.unassignParkingSpotByCondoId, [parkingid], (error, results) => {
    if (error) {
      console.error('Error assigning parking spot: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'parking spot successfully unassigned.' })
    }
  })
}

const getAssignedParkingSpots = (req, res) => {
  console.log('Get All Assigned Parking Spots')
  pool.query(queries.getAssignedParkingSpots, (error, results) => {
    if (error) {
      console.error('Error finding assigned parking spots: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getAssignedParkingSpotByCondoId = (req, res) => {
  console.log('Getting Assigned Parking Spot By Condoid')
  const parkingid = req.body
  pool.query(queries.getAssignedParkingSpotByCondoId, [parkingid])
}

module.exports = {
  assignParkingSpotByCondoId,
  unassignParkingSpotByCondoId,
  getAssignedParkingSpotByCondoId,
  getAssignedParkingSpots
}
