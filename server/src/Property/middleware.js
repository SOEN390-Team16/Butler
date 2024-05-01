const pool = require('../../db')
const queries = require('./queries')

const propertyExistsMiddleware = async (req, res, next) => {
  const property_id = parseInt(req.params.property_id)
  try {
    req.property = await checkPropertyExists(property_id)
    next()
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message })
  }
}

const checkPropertyExists = async (property_id) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
      if (error) {
        const err = new Error('Internal Server Error')
        err.status = 500
        err.cause = error
        reject(err)
      } else if (results.rowCount === 0) {
        const err = new Error('Property not found')
        err.status = 404
        reject(err)
      } else {
        resolve(results.rows.at(0))
      }
    })
  })
}

module.exports = {
  propertyExistsMiddleware
}
