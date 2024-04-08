const pool = require('../../db')
const queriesRK = require('./queries')
const queriesPU = require('../PublicUser/queries')

function generateRandomKey () {
  return Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2) + '-' +
      Math.random().toString(36).slice(2)
}

const generateRegistrationKey = (randomKeyGenerator = generateRandomKey) => (req, res) => {
  console.log('Generating Unique Registration Key')

  const role = req.params.role

  if (role !== 'renter' && role !== 'condo_owner') {
    console.error('role must be either renter or condo_owner')
    return res.status(422).json({ error: 'Invalid Role Input' })
  }

  const key = randomKeyGenerator()

  pool.query(queriesRK.checkIfRegistrationKeyAlreadyExists, [key], (error, results) => {
    if (error) {
      console.error('Error checking if registration key already exists', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length !== 0) {
      res.status(404).send('Registration Key Already Exists')
    } else {
      pool.query(queriesRK.generateRegistrationKey, [key, role], (error, result) => {
        if (error) {
          console.error('Error assigning role to new registration key', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        res.status(201).send(key)
      })
    }
  })
}

const deleteRegistrationKey = (req, res) => {
  console.log('Deleting Registration Key')

  const key = req.params.key

  pool.query(queriesRK.deleteRegistrationKey, [key], (error, results) => {
    if (error) {
      console.error('Error deleting registration key: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Registration Key deleted successfully' })
    }
  })
}

const getRoleByRegistrationKey = (req, res) => {
  console.log('Getting Role By Registration Key')

  const key = req.params.key

  pool.query(queriesRK.getRoleByRegistrationKey, [key], (error, results) => {
    if (error) {
      console.error('Error getting role by registration key: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Registration Key Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const updateUserRoleByRegistrationKeyAndUserId = (req, res) => {
  console.log('Updating User Role By Registration Key')

  const { key, userid } = req.body
  let role

  pool.query(queriesRK.getRoleByRegistrationKey, [key], (error, results) => {
    if (error) {
      console.error('Error getting role by registration key: ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Registration Key Not Found' })
    } else {
      role = results.rows[0].role

      pool.query(queriesPU.getPublicUserById, [userid], (error, results) => {
        if (error) {
          console.error('Error getting public user by id: ', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else if (results.rowCount === 0) {
          return res.status(404).json({ error: 'Public User Not Found' })
        } else {
          pool.query(queriesRK.deleteRegistrationKey, [key], (error, results) => {
            if (error) {
              console.error('Error deleting registration key: ', error)
              return res.status(500).json({ error: 'Internal Server Error' })
            } else {
              pool.query(queriesRK.setRole, [role, userid], (error, results) => {
                if (error) {
                  console.error('Error updating user role: ', error)
                  return res.status(500).json({ error: 'Internal Server Error' })
                } else {
                  pool.query(queriesPU.getPublicUserById, [userid], (error, results) => {
                    if (error) {
                      console.error('Error getting public user by id: ', error)
                      return res.status(500).json({ error: 'Internal Server Error' })
                    } else if (results.rowCount === 0) {
                      return res.status(404).json({ error: 'Public User Not Found' })
                    } else {
                      return res.status(200).json(results.rows)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = {
  generateRegistrationKey,
  deleteRegistrationKey,
  getRoleByRegistrationKey,
  updateUserRoleByRegistrationKeyAndUserId
}
