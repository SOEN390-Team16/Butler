const pool = require('../../db')
const queries = require('./queries')

const getAllFacilities = (req, res) => {
  console.log('Get All Facilities')

  pool.query(queries.getAllFacilities, (error, results) => {
    if (error) {
      console.log('Error finding facilities:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Facility not found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getFacilityById = (req, res) => {
  console.log('Get Facility by Id')
  const facilityid = parseInt(req.params.facilityid)
  pool.query(queries.getFacilityById, [facilityid], (error, results) => {
    if (error) {
      console.log('Error fetching facility:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Facility not found' })
    } else {
      res.status(200).json(results.rows.at(0))
    }
  })
}

const getFacilityByPropertyId = (req, res) => {
  console.log('Get Facility by Property Id')
  const propertyid = parseInt(req.params.propertyid)
  pool.query(queries.getFacilityByPropertyId, [propertyid], (error, results) => {
    if (error) {
      console.log('Error fetching facility:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Facility not found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const addFacility = (req, res) => {
  console.log('Add a Facility')
  const { property_id, name, description } = req.body

  pool.query(queries.checkIfFacilityExistsByDetails, [property_id, name, description], (error, results) => {
    if (error) {
      console.log('Error checking facility existence:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount > 0) {
      return res.status(400).json({ error: 'Facility already exists' })
    } else {
      pool.query(queries.addFacility, [property_id, name, description], (error, results) => {
        if (error) {
          console.log('Error adding facility:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(201).json({ message: 'Facility added successfully' })
        }
      })
    }
  })
}

const removeFacility = (req, res) => {
  console.log('Remove a Facility')

  const facilityid = parseInt(req.params.facilityid)
  pool.query(queries.checkIfFacilityExists, [facilityid], (error, results) => {
    if (error) {
      console.log('Error finding facility:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(400).json({ error: 'Facility doesn\'t exist' })
    } else {
      pool.query(queries.removeFacility, [facilityid], (error, results) => {
        if (error) {
          console.log('Error removing facility:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json({ message: 'Facility removed successfully' })
        }
      })
    }
  })
}

const updateFacility = (req, res) => {
  console.log('Update a Facility')
  const facilityid = parseInt(req.params.facilityid)
  const { property_id, name, description } = req.body
  pool.query(queries.checkIfFacilityExists, [facilityid], (error, results) => {
    if (error) {
      console.log('Error checking facility existence:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Facility not found' })
    } else {
      pool.query(queries.updateFacility, [property_id, name, description, facilityid], (error, results) => {
        if (error) {
          console.log('Error updating facility:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json({ message: 'Facility updated successfully' })
        }
      })
    }
  })
}

module.exports = {
  getAllFacilities,
  getFacilityById,
  getFacilityByPropertyId,
  addFacility,
  removeFacility,
  updateFacility
}
