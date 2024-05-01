const pool = require('../../db')
const queries = require('./queries')
const assignParkingSpotByUserId = (req, res) => {
  console.log('Assigning a parking spot by user id')
  const userid = parseInt(req.params.userid)
  pool.query(queries.assignParkingSpotByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error assigning parking spot: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'parking spot successfully assigned.' })
    }
  })
}

const assignParkingSpotByCondoId = (req, res) => {
  console.log('Assigning parking spot by condo id')
  const condoid = parseInt(req.params.condoid)
  pool.query(queries.assignParkingSpotByCondoId, [condoid], (error, results) => {
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
  const property_id = parseInt(req.query.property_id)
  const companyid = parseInt(req.query.companyid)
  const parkingid = parseInt(req.query.parkingid)
  const condoid = parseInt(req.query.condoid)

  if (!isNaN(parkingid)) {
    console.log('getting assigned parking spot by parking id')
    pool.query(queries.getAssignedParkingSpotsByParkingId, [parkingid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        return res.status(200).json(results.rows)
      }
    })
  } else if (!isNaN(condoid)) {
    console.log('getting assigned parking spot by condo id')
    pool.query(queries.getAssignedParkingSpotsByCondoId, [condoid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        return res.status(200).json(results.rows)
      }
    })
  } else if (!isNaN(property_id)) {
    console.log('getting assigned parking spots by property_id')
    pool.query(queries.getAssignedParkingSpotsByPropertyId, [property_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        return res.status(200).json(results.rows)
      }
    })
  } else if (!isNaN(companyid)) {
    console.log('getting assigned parking spots by company_id')
    pool.query(queries.getAssignedParkingSpotsByCompanyId, [companyid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        return res.status(200).json(results.rows)
      }
    })
  } else {
    console.log('Get All Assigned Parking Spots')
    pool.query(queries.getAssignedParkingSpots, (error, results) => {
      if (error) {
        console.error('Error getting assigned parking spots: ', error)
        res.status(500).json({ error: 'Internal Server Error' })
      } else {
        res.status(200).json(results.rows)
      }
    })
  }
}

const getAssignedParkingSpotByUserId = (req, res) => {
  console.log('Getting Assigned Parking Spot By Userid')
  const userid = parseInt(req.params.userid)
  pool.query(queries.getAssignedParkingSpotByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error getting assigned parking spot by user id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

module.exports = {
  assignParkingSpotByUserId,
  assignParkingSpotByCondoId,
  unassignParkingSpotByUserId,
  getAssignedParkingSpotByUserId,
  getAssignedParkingSpots
}
