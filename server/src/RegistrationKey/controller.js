const pool = require('../../db')
const queries = require('./queries')

// This generates two random alphanumeric strings of length 10 and concatenates them to create a key of length 20
function generateRandomKey () {
  return Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2)
}

const generateRegistrationKey = (req, res) => {
  console.log('Generating Unique Registration Key')
  const { email, role } = req.body
  const registration_key = generateRandomKey()
  pool.query(queries.checkIfRegistrationKeyAlreadyExists, [registration_key], (error, results) => {
    if (error) {
      console.error('Error checking if registration key already exists', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length !== 0) {
      res.status(404).send('Registration Key Already Exists')
    } else {
      pool.query(queries.checkIfPublicUserExists, [email], (error, results) => {
        if (error) {
          console.error('Error checking if public user exists', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        if (results.rowCount === 0) {
          res.status(404).json({ error: 'Public User not found' })
        } else {
          pool.query(queries.generateRegistrationKey, [registration_key, email, role], (error, result) => {
            if (error) {
              console.error('Error assigning new registration key', error)
              return res.status(500).json({ error: 'Internal Server Error' })
            }
            res.status(201).send('new registration key assigned to user')
          })
        }
      })
    }
  })
}

const getRegistrationKeyByEmail = (req, res) => {
  console.log('Getting Registration Key By Email')
  const email = req.params.email
  pool.query(queries.getRegistrationKeyByEmail, [email], (error, results) => {
    if (error) {
      console.error('Error getting registration key:', error)
      return res.status(500).json({ error: 'Internal Sever Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Registration Key Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const revokeRegistrationKeyByEmailAndCondoId = (req, res) => {
  console.log('Revoking Registration Key By Email and CondoID')
  const { email, condoID } = req.body
  pool.query(queries.checkIfUserHasActiveRegistrationKey, [email, condoID], (error, result) => {
    if (error) {
      console.error('Error finding user:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    } else if (result.rowCount === 1) {
      pool.query(queries.updateRoleBeforeRevoking, [email], (error, result) => {
        if (error) {
          console.error('Error updating user role before revoking:', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        }
      })
    }
    pool.query(queries.revokeRegistrationKey, [email, condoID], (error, result) => {
      if (error) {
        console.error('Error revoking registration key:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      res.status(200).send('Key Revoked Successfully')
    })
  })
}

module.exports = {
  generateRegistrationKey,
  getRegistrationKeyByEmail,
  revokeRegistrationKeyByEmailAndCondoId
}
