const pool = require('../../db')
const queries = require('../assigned_locker/queries')
const assignLockerByCondoId = (req, res) => {
  console.log('Assigning a locker')
  const { condoid } = req.body
  pool.query(queries.assignLockerByCondoId, [condoid], (error, results) => {
    if (error) {
      console.error('Error assigning locker: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Locker successfully assigned.' })
    }
  })
}

const unassignLockerByCondoId = (req, res) => {
  console.log('Unassigning a locker')
  const condoid = parseInt(req.params.condoid)
  pool.query(queries.unassignLockerByCondoId, [condoid], (error, results) => {
    if (error) {
      console.error('Error assigning locker: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Locker successfully unassigned.' })
    }
  })
}

const getAssignedLockers = (req, res) => {
  console.log('Get All Assigned Lockers')
  pool.query(queries.getAssignedLockers, (error, results) => {
    if (error) {
      console.error('Error finding assigned lockers: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getAssignedLockerByCondoId = (req, res) => {
  console.log('Getting Assigned Locker By Condoid')
  const condoid = req.body
  pool.query(queries.getAssignedLockerByCondoId, [condoid])
}

module.exports = {
  assignLockerByCondoId,
  unassignLockerByCondoId,
  getAssignedLockerByCondoId,
  getAssignedLockers
}
