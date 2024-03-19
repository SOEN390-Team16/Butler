const pool = require('../../db')
const queries = require('../assigned_locker/queries')
const assignLockerByUserId = (req, res) => {
  console.log('Assigning a locker')
  const { userid } = req.body
  pool.query(queries.assignLockerByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error assigning locker: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Locker successfully assigned.' })
    }
  })
}

const unassignLockerByUserId = (req, res) => {
  console.log('Unassigning a locker')
  const userid = parseInt(req.params.userid)
  pool.query(queries.unassignLockerByUserId, [userid], (error, results) => {
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
      console.error('Error getting assigned lockers: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Assigned Lockers Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getAssignedLockerByUserId = (req, res) => {
  console.log('Getting Assigned Locker By Userid')
  const userid = req.body
  pool.query(queries.getAssignedLockerByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error getting assigned locker by user id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'Assigned Locker Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

module.exports = {
  assignLockerByUserId,
  unassignLockerByUserId,
  getAssignedLockerByUserId,
  getAssignedLockers
}
