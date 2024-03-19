const pool = require('../../db')
const queries = require('./queries')
const assignParkingSpotByUserId = (req, res) => {
  console.log('Assigning a parking spot')
  const { userid } = req.body
  pool.query(queries.assignParkingSpotByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error assigning parking spot: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'parking spot successfully assigned.' })
    }
  })
}

const unassignParkingSpotByUserId = (req, res) => {
  console.log('Unassigning a parking spot')
  const userid = parseInt(req.params.userid)
  pool.query(queries.unassignParkingSpotByUserId, [userid], (error, results) => {
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
      console.error('Error getting assigned parking spots: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Assigned Parking Spots Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getAssignedParkingSpotByUserId = (req, res) => {
  console.log('Getting Assigned Parking Spot By Userid')
  const userid = req.body
  pool.query(queries.getAssignedParkingSpotByUserId, [userid], (error, results) => {
  if (error) {
    console.error('Error getting assigned parking spot by user id: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  } else if (results.rows.length === 0) {
    res.status(404).json({ error: 'Assigned Parking Spot Not Found' })
  } else {
    res.status(200).json(results.rows)
  }
})
}


module.exports = {
  assignParkingSpotByUserId,
  unassignParkingSpotByUserId,
  getAssignedParkingSpotByUserId,
  getAssignedParkingSpots
}
