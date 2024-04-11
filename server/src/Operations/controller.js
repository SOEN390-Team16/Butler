const pool = require('../../db')
const queries = require('./queries')

const getAllOperations = (req, res) => {
  console.log('Get All Operations')

  pool.query(queries.getAllOperations, (error, results) => {
    if (error) {
      console.error('Error getting all operations', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getOperationById = (req, res) => {
  console.log('Get Operation By Id')

  const operationId = parseInt(req.params.operation_id)

  pool.query(queries.getOperationById, [operationId], (error, results) => {
    if (error) {
      console.error('Error getting operation by id ', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Operation not found' })
    } else {
      res.status(200).json(results.rows.at(0))
    }
  })
}

const createOperation = (req, res) => {
  console.log('Create Operation')

  const { property_id, cost, date, type } = req.body
  pool.query(queries.checkIfOperationExistsByDetails, [property_id, cost, date, type], (error, results) => {
    if (error) {
      console.error('Error checking operation existence', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount > 0) {
      return res.status(400).json({ error: 'Operation already exists' })
    } else {
      pool.query(queries.createOperation, [property_id, cost, date, type], (error, results) => {
        if (error) {
          console.error('Error creating operation', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(201).json({ message: 'Operation created successfully' })
        }
      })
    }
  })
}

const deleteOperation = (req, res) => {
  console.log('Delete Operation')

  const operationId = parseInt(req.params.operation_id)

  pool.query(queries.deleteOperation, [operationId], (error, results) => {
    if (error) {
      console.error('Error deleting operation', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Operation deleted successfully' })
    }
  })
}

const updateOperation = (req, res) => {
  console.log('Update Operation')

  const operationId = parseInt(req.params.operation_id)
  const { property_id, cost, date, type } = req.body

  pool.query(queries.checkIfOperationExistsById, [operationId], (error, results) => {
    if (error) {
      console.error('Error checking operation existence', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Operation not found' })
    } else {
      pool.query(queries.updateOperation, [property_id, cost, date, type, operationId], (error, results) => {
        if (error) {
          console.error('Error updating operation', error)
          return res.status(500).json({ error: 'Internal Server Error' })
        } else {
          res.status(200).json({ message: 'Operation updated successfully' })
        }
      })
    }
  })
}

const readOperationalCosts = (req, res) => {
  console.log('Calculate Operational Budget')

  pool.query(queries.calculateTotalCost, (error, results) => {
    if (error) {
      console.error('Error calculating operational budget', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else {
      const totalCost = results.rows[0].total_cost || 0
      res.status(200).json({ 'Total Operational Cost': totalCost })
    }
  })
}

module.exports = {
  getAllOperations,
  getOperationById,
  createOperation,
  deleteOperation,
  updateOperation,
  readOperationalCosts
}
