const pool = require('../../db')
const queries = require('../assigned_locker/queries')
const assignLockerByUserId = (req, res) => {
  console.log('Assigning a locker by user id')
  const userid = parseInt(req.params.userid)
  pool.query(queries.assignLockerByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error assigning locker: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json({ message: 'Locker successfully assigned.' })
    }
  })
}

const assignLockerByCondoId = (req, res) => {
  console.log('Assigning a locker by condo id')
  const condoid = parseInt(req.params.condoid)
  pool.query(queries.assignLockerByCondoId, [condoid], (error, results) => {
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
  const property_id = parseInt(req.query.property_id)
  const companyid = parseInt(req.query.companyid)
  const lockerid = parseInt(req.query.lockerid)
  const condoid = parseInt(req.query.condoid)

  if (!isNaN(lockerid)) {
    console.log('getting assigned lockers by lockerid')
    pool.query(queries.getAssignedLockersByLockerId, [lockerid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        res.status(200).json(results.rows)
      }
    })
  } else if (!isNaN(condoid)) {
    console.log('getting assigned lockers by condoid')
    pool.query(queries.getAssignedLockersByCondoId, [condoid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        res.status(200).json(results.rows)
      }
    })
  } else if (!isNaN(property_id)) {
    console.log('getting assigned lockers by property_id')
    pool.query(queries.getAssignedLockersByPropertyId, [property_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        return res.status(200).json(results.rows)
      }
    })
  } else if (!isNaN(companyid)) {
    console.log('getting assigned lockers by companyid')
    pool.query(queries.getAssignedLockersByCompanyId, [companyid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      } else {
        return res.status(200).json(results.rows)
      }
    })
  } else {
    console.log('Getting All Assigned Lockers')
    pool.query(queries.getAssignedLockers, (error, results) => {
      if (error) {
        console.error('Error getting assigned lockers: ', error)
        res.status(500).json({ error: 'Internal Server Error' })
      } else {
        res.status(200).json(results.rows)
      }
    })
  }
}

const getAssignedLockerByUserId = (req, res) => {
  console.log('Getting Assigned Locker By Userid')
  const userid = parseInt(req.params.userid)
  pool.query(queries.getAssignedLockerByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error getting assigned locker by user id: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

module.exports = {
  assignLockerByUserId,
  unassignLockerByUserId,
  getAssignedLockerByUserId,
  getAssignedLockers,
  assignLockerByCondoId
}
