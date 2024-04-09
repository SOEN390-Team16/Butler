const pool = require('../../db')
const queries = require('./queries')
const bcrypt = require('bcrypt')

const getPublicUsers = (req, res) => {
  console.log('Get All Public Users')
  pool.query(queries.getPublicUsers, (error, results) => {
    if (error) {
      // console.error('Error finding public users:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Public Users not found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getPublicUserById = (req, res) => {
  console.log('get a specific Public User')
  const userid = parseInt(req.params.userid)
  pool.query(queries.getPublicUserById, [userid], (error, results) => {
    if (error) {
      // console.error('Error getting user:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Public User not found' })
    } else {
      res.status(200).json(results.rows[0])
    }
  })
}

const addPublicUser = (req, res) => {
  console.log('add a Public User')
  const { first_name, last_name, email, password } = req.body
  pool.query(queries.checkIfPUEmailExists, [email], async (error, results) => {
    if (error) {
      // console.error('Error finding email:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length !== 0) {
      res.status(404).send('Email Already Exists')
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 5)
        pool.query(queries.addPublicUser, [first_name, last_name, email, hashedPassword], (error, result) => {
          if (error) {
            console.log(error)
          }
          res.status(201).json(result.rows)
        })
      } catch (hashError) {
        // console.error('Error hashing password:', hashError)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  })
}

const updatePublicUser = async (req, res) => {
  const userid = req.params.userid
  const { first_name, last_name, email, password, profile_picture } = req.body

  if (
    !first_name &&
    !last_name &&
    !email &&
    !password &&
    profile_picture === undefined
  ) {
    return res
      .status(400)
      .json({ error: 'At least one field is required for updating' })
  }

  const setClauses = []
  const values = []

  if (first_name) {
    setClauses.push('first_name = $' + (values.length + 1))
    values.push(first_name)
  }
  if (last_name) {
    setClauses.push('last_name = $' + (values.length + 1))
    values.push(last_name)
  }
  if (email) {
    setClauses.push('email = $' + (values.length + 1))
    values.push(email)
  }
  if (password) {
    setClauses.push('password = $' + (values.length + 1))
    values.push(password)
  }
  if (profile_picture !== undefined) {
    setClauses.push('profile_picture = $' + (values.length + 1))
    values.push(profile_picture)
  }

  const query = `UPDATE public_user
                 SET ${setClauses.join(
                         ', '
                 )}
                 WHERE userid = $${values.length + 1} RETURNING *`

  pool.query(queries.getPublicUserById, [userid], (error, results) => {
    if (error) {
      // console.error("Error updating user:", error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Public User not found' })
    } else {
      pool.query(query, [...values, userid], (error, result) => {
        if (error) {
          // console.error("Error updating public user:", error);
          return res.status(500).json({ error: 'Internal Server Error' })
        }

        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Public User not found' })
        }
        console.log(result.rows)
        res.status(200).json(result.rows[0])
      })
    }
  })
}

const removePublicUser = (req, res) => {
  const userid = parseInt(req.params.userid)
  pool.query(queries.getPublicUserById, [userid], (error, result) => {
    if (error) {
      // console.error("Error finding user:", error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    pool.query(queries.removePublicUser, [userid], (error, results) => {
      if (error) {
        // console.error("Error removing user:", error);
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      res.status(200).send('user removed successfully.')
    })
  })
}

module.exports = {
  getPublicUsers,
  getPublicUserById,
  addPublicUser,
  removePublicUser,
  updatePublicUser
}
