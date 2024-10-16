const pool = require('../../db')
const queries = require('./queries')

async function addDetails (property_id, companyid, parking_count, unit_count, locker_count) {
  try {
    for (let index = 1; index <= unit_count; index++) {
      await pool.query(queries.updateCondoDetails, [property_id, companyid, index])
    }

    for (let index = 1; index <= locker_count; index++) {
      await pool.query(queries.updateLockerDetails, [property_id, companyid, index])
    }

    for (let index = 1; index <= parking_count; index++) {
      await pool.query(queries.updateParkingDetails, [property_id, companyid, index])
    }

    return { status: 200, message: 'Property details updated.' }
  } catch (error) {
    console.error('Error updating details:', error)
    return { status: 500, message: 'Internal Server Error' }
  }
}
const checkIfPropertyNameExists = async (property_name) => {
  const results = await pool.query(queries.checkIfPropertyNameExists, [property_name])
  return results.rowCount > 0
}

const checkIfCompanyExists = async (companyid) => {
  const results = await pool.query(queries.checkIfCompanyExists, [companyid])
  return results.rows.length > 0
}

const addPropertyToDatabase = async (companyid, property_name, unit_count, parking_count, locker_count, address) => {
  try {
    await pool.query(queries.addProperty, [companyid, property_name, unit_count, parking_count, locker_count, address])
    const propertyResult = await pool.query(queries.getPropertyByName, [property_name])
    if (propertyResult.rowCount < 1) {
      return { error: true }
    }
    return { property_id: propertyResult.rows[0].property_id }
  } catch (error) {
    console.error('Error adding property:', error)
    return { error: true }
  }
}
// Get all properties
const getProperties = (req, res) => {
  console.log('Get All Properties')

  // Retrieve all properties from the database
  pool.query(queries.getProperties, (error, results) => {
    if (error) {
      // Handle error if querying properties fails
      console.error('Error finding properties:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      // Send the retrieved properties as a response
      res.status(200).json(results.rows)
    }
  })
}

// Get a specific property by its ID
const getPropertyById = (req, res) => {
  console.log('Get a specific property profile')

  // Extract property ID from request parameters
  const property_id = parseInt(req.params.property_id)

  // Query the database for the property with the given ID
  pool.query(queries.getPropertyById, [property_id], (error, results) => {
    if (error) {
      // Handle error if fetching property fails
      console.error('Error fetching property profile:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      // Return 404 error if property is not found
      return res.status(404).json({ error: 'Property not found' })
    } else {
      // Send the retrieved property as a response
      res.status(200).json(results.rows.at(0))
    }
  })
}

const getPropertyByCompanyId = (req, res) => {
  console.log('Get Property By Company ID')

  const companyid = parseInt(req.params.companyid)

  pool.query(queries.getPropertyByCompanyId, [companyid], (error, results) => {
    if (error) {
      console.error('Error getting property: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Property Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getPropertyByUserId = (req, res) => {
  console.log('Get Property By User ID')

  const userid = parseInt(req.params.userid)

  pool.query(queries.getPropertyByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error getting property: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Property Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getPropertyByCondoId = (req, res) => {
  console.log('Get Property By Condo ID')
  const condoid = parseInt(req.params.condoid)
  pool.query(queries.getPropertyByCondoId, [condoid], (error, results) => {
    if (error) {
      console.error('Error getting property: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Property Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getPropertyByLockerId = (req, res) => {
  console.log('Get Property By Locker ID')
  const lockerid = parseInt(req.params.lockerid)
  pool.query(queries.getPropertyByLockerId, [lockerid], (error, results) => {
    if (error) {
      console.error('Error getting property: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Property Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getPropertyByParkingId = (req, res) => {
  console.log('Get Property By Parking ID')
  const parkingid = parseInt(req.params.parkingid)
  pool.query(queries.getPropertyByParkingId, [parkingid], (error, results) => {
    if (error) {
      console.error('Error getting property: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Property Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

// Add a new property
const addProperty = async (req, res) => {
  try {
    console.log('Add a Property')
    const { companyid, property_name, unit_count, parking_count, locker_count, address } = req.body

    // Check if property name already exists
    const propertyNameExists = await checkIfPropertyNameExists(property_name)
    if (propertyNameExists) {
      return res.status(400).json({ error: 'Property name already exists' })
    }

    // Check if the given company exists
    const companyExists = await checkIfCompanyExists(companyid)
    if (!companyExists) {
      return res.status(404).send('Company does not exist')
    }

    // Create the property profile in the database
    const propertyResult = await addPropertyToDatabase(companyid, property_name, unit_count, parking_count, locker_count, address)

    if (propertyResult.error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    // Retrieve the property id
    const property_id = propertyResult.property_id

    // Add property details
    const detailsResult = await addDetails(property_id, companyid, parking_count, unit_count, locker_count)

    return res.status(detailsResult.status).json({ message: detailsResult.message })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update an existing property
const updateProperty = (req, res) => {
  const property_id = req.params.property_id
  const { property_name, unit_count, parking_count, locker_count, address } = req.body

  // Check if at least one field is provided for updating
  if (!property_name && !unit_count && !parking_count && !locker_count && !address) {
    return res.status(400).json({ error: 'At least one field is required for updating' })
  }

  const setClauses = []
  const values = []

  // Construct update query based on provided fields
  if (property_name) {
    setClauses.push('property_name = $' + (values.length + 1))
    values.push(property_name)
  }
  if (unit_count) {
    setClauses.push('unit_count = $' + (values.length + 1))
    values.push(unit_count)
  }
  if (parking_count) {
    setClauses.push('parking_count = $' + (values.length + 1))
    values.push(parking_count)
  }
  if (locker_count) {
    setClauses.push('locker_count = $' + (values.length + 1))
    values.push(locker_count)
  }
  if (address) {
    setClauses.push('address = $' + (values.length + 1))
    values.push(address)
  }

  const query = `UPDATE property SET ${setClauses.join(', ')} WHERE property_id = $${values.length + 1}`

  // Check if the property exists before applying any changes to it
  pool.query(queries.getPropertyById, [property_id], (error, results) => {
    if (error) {
      // Handle error if fetching property fails
      console.error('Error updating property profile:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      // Return 404 error if property profile is not found
      return res.status(404).json({ error: 'Property profile not found' })
    } else {
      // Update the property profile in the database
      pool.query(query, [...values, property_id], (error, result) => {
        if (error) {
          // Handle error if updating property fails
          console.error('Error updating property profile:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        // Send success message as a response
        res.status(200).json({ message: 'Property profile successfully updated' })
      })
    }
  })
}

// Remove a property
const removeProperty = (req, res) => {
  const property_id = parseInt(req.params.property_id)
  pool.query(queries.getPropertyById, [property_id], (error, results) => {
    if (error) {
      // Handle error if checking property existence fails
      console.error('Error checking property existence:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      // Return 404 error if property is not found
      return res.status(404).json({ error: 'Property not found' })
    } else {
      // Remove the property profile from the database
      pool.query(queries.removeProperty, [property_id], (error, results) => {
        if (error) {
          // Handle error if removing property fails
          console.error('Error removing property profile:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        // Send success message as a response
        res.status(200).json({ message: 'Property profile successfully removed.' })
      })
    }
  })
}

module.exports = {
  getProperties,
  getPropertyById,
  getPropertyByCompanyId,
  getPropertyByCondoId,
  getPropertyByLockerId,
  getPropertyByParkingId,
  getPropertyByUserId,
  addProperty,
  updateProperty,
  removeProperty
}
