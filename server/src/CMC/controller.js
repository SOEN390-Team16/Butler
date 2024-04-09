const pool = require('../../db')
const queries = require('./queries')
const bcrypt = require('bcrypt')

const getCMCs = (req, res) => {
  console.log('get all Condo Management Companies')
  pool.query(queries.getCMCs, (error, results) => {
    if (error) {
      console.error('Error finding cmc users:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'CMC User Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getCMCById = (req, res) => {
  console.log("get cmc's by id")
  const companyID = parseInt(req.params.companyID)
  pool.query(queries.getCMCById, [companyID], (error, results) => {
    if (error) {
      console.error('Error finding cmc user:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'CMC User Not Found' })
    }
    res.status(200).json(results.rows[0])
  })
}

const addCMC = (req, res) => {
  console.log('Adding Condo Management Company')
  const { company_name, email, password } = req.body
  pool.query(queries.checkIfCMCEmailExists, [email], async (error, results) => {
    if (error) {
      console.error('Error checking if email exists:', error)
      return res
        .status(500)
        .send('An error occurred while checking email existence.')
    }
    if (results.rows.length) {
      return res.status(400).send('Email Already Exists')
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 5)
        pool.query(
          queries.addCMC,
          [company_name, email, hashedPassword],
          (error, result) => {
            if (error) return res.json(error)
            res
              .status(201)
              .send('Condo Management Company Created Successfully!')
          }
        )
      } catch (hashError) {
        console.error('Error hashing password:', hashError)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  })
}

const updateCMC = async (req, res) => {
  console.log('updating cmc user')
  const companyID = req.params.companyID
  const { company_name, email, password } = req.body

  if (!company_name && !email && password === undefined) {
    return res
      .status(400)
      .json({ error: 'At least one field is required for updating' })
  }

  const setClauses = []
  const values = []

  if (company_name) {
    setClauses.push('company_name = $' + (values.length + 1))
    values.push(company_name)
  }
  if (email) {
    setClauses.push('email = $' + (values.length + 1))
    values.push(email)
  }
  if (password) {
    setClauses.push('password = $' + (values.length + 1))
    values.push(await bcrypt.hash(password, 5))
  }

  const query = `UPDATE condo_management_company SET ${setClauses.join(
    ', '
  )} WHERE companyID = $${values.length + 1}`

  pool.query(queries.getCMCById, [companyID], (error, results) => {
    if (error) {
      console.error('Error finding cmc user:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'CMC User Not Found' })
    }

    pool.query(query, [...values, companyID], (error, result) => {
      if (error) {
        console.error('Error updating cmc user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'cmc user not found' })
      }

      res.status(200).json({ message: 'cmc user updated successfully' })
    })
  })
}

const removeCMC = (req, res) => {
  const companyID = parseInt(req.params.companyID)
  pool.query(queries.getCMCById, [companyID], (error, result) => {
    if (error) {
      console.error('Error finding cmc user:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'cmc user not found' })
    }
    pool.query(queries.removeCMC, [companyID], (error, results) => {
      if (error) {
        console.error('Error removing cmc user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      res.status(200).send('cmc user removed successfully.')
    })
  })
}
module.exports = {
  getCMCs,
  getCMCById,
  addCMC,
  removeCMC,
  updateCMC
}
