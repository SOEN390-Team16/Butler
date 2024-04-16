const pool = require('../../db')
const queries = require('./queries')

const getTotalCondoFeesCollected = async (req, res) => {
  console.log('Getting total condo fees collected')
  const property_id = parseInt(req.params.property_id)

  pool.query(queries.checkIfPropertyExists, [property_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount < 1) {
      return res.status(404).json({ error: 'Property not found' })
    } else {
      pool.query(queries.getTotalCondoFeesCollected, [property_id], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json(results.rows)
        }
      })
    }
  })
}

const getTotalOperationCosts = (req, res) => {
  console.log('Getting total operation costs')
  const property_id = parseInt(req.params.property_id)
  const year = parseInt(req.params.year)

  pool.query(queries.checkIfPropertyExists, [property_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount < 1) {
      return res.status(404).json({ error: 'Property not found' })
    } else {
      if (!isNaN(year)) {
        pool.query(queries.getTotalOperationCostsByYear, [property_id, year], (error, results) => {
          if (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
          } else {
            return res.status(200).json(results.rows)
          }
        })
      } else {
        pool.query(queries.getTotalOperationCosts, [property_id], (error, results) => {
          if (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
          } else {
            return res.status(200).json(results.rows)
          }
        })
      }
    }
  })
}

const getAnnualReport = (req, res) => {
  console.log('Getting annual report')
  const property_id = parseInt(req.params.property_id)
  const year = parseInt(req.params.year)

  pool.query(queries.checkIfPropertyExists, [property_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount < 1) {
      return res.status(404).json({ error: 'Property not found' })
    } else {
      pool.query(queries.getAnnualReport, [property_id, year], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json(results.rows)
        }
      })
    }
  })
}

const getEverythingAtOnceByPropertyId = (req, res) => {
  console.log('getting total collected condo fees, total operational costs for the year, and annual report')
  const property_id = parseInt(req.params.property_id)
  const year = parseInt(req.params.year)

  pool.query(queries.checkIfPropertyExists, [property_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount < 1) {
      return res.status(404).json({ error: 'Property not found' })
    } else {
      pool.query(queries.getEverythingAtOnceByPropertyId, [property_id, year], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json(results.rows)
        }
      })
    }
  })
}

const getEverythingAtOnceByCompanyId = (req, res) => {
  console.log('getting total collected condo fees, total operational costs for the year, and annual report for all properties')
  const companyid = parseInt(req.params.companyid)
  const year = parseInt(req.params.year)

  pool.query(queries.checkIfCompanyExists, [companyid], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount < 1) {
      return res.status(404).json({ error: 'Company not found' })
    } else {
      pool.query(queries.getEverythingAtOnceByCompanyId, [companyid, year], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json(results.rows)
        }
      })
    }
  })
}

module.exports = {
  getAnnualReport,
  getTotalOperationCosts,
  getTotalCondoFeesCollected,
  getEverythingAtOnceByPropertyId,
  getEverythingAtOnceByCompanyId
}
