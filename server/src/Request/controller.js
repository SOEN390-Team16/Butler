const pool = require('../../db')
const queries = require('./queries')

const getAllRequests = (req, res) => {
  console.log('Get All Requests')
  pool.query(queries.getAllRequests, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'No Requests Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getRequestByID = (req, res) => {
  console.log('Get a Specific Request')
  const reqid = parseInt(req.params.request_id)
  pool.query(queries.getRequestsByID, [reqid], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Request Not Found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getRequestsByEmpID = (req, res) => {
  console.log('Get Requests Associated With A Specific Employee')
  const empid = parseInt(req.params.employee_id)
  pool.query(queries.checkIfEmployeeExists, [empid], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    } else {
      pool.query(queries.getRequestsByEmpID, [empid], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        if (results.rowCount === 0) {
          return res
            .status(404)
            .json({ error: 'No Requests Assigned To This Employee' })
        } else {
          res.status(200).json(results.rows)
        }
      })
    }
  })
}

const getRequestsByUserID = (req, res) => {
  console.log('Get Requests Associated With A Specific User')
  const userid = parseInt(req.params.user_id)
  pool.query(queries.checkIfUserExists, [userid], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' })
    } else {
      pool.query(queries.getRequestsByUserID, [userid], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        if (results.rowCount === 0) {
          return res.status(404).json({ error: 'This User Has No Requests' })
        } else {
          res.status(200).json(results.rows)
        }
      })
    }
  })
}

const addRequest = async (req, res) => {
  console.log('Add a Request')
  const { user_id, description, type } = req.body
  try {
    const userExists = await pool.query(queries.checkIfUserExists, [user_id])
    if (userExists.rows.length === 0) {
      return res.status(404).send('User Not Found')
    } else {
      const reqResults = await pool.query(queries.addRequest, [
        user_id,
        description,
        type
      ])
      if (reqResults.rowCount === 0) {
        return res.status(500).json({ error: 'Request could not be created' })
      } else {
        const createdRequest = reqResults.rows[0]
        createdRequest.employee_id = null
        createdRequest.status = 'Received'
        return res.status(200).json({
          message: 'Request Created Successfully',
          request: createdRequest
        })
      }
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const assignRequestToEmployee = (req, res) => {
  console.log('Assign Request To Employee')
  const requestId = parseInt(req.params.reqid)
  const employeeId = parseInt(req.body.employee_id)

  pool.query(
    queries.checkIfEmployeeExists,
    [employeeId],
    (error, empResults) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      if (empResults.rowCount === 0) {
        return res.status(404).json({ error: 'Employee not found' })
      } else {
        pool.query(queries.getRequestByID, [requestId], (error, reqResults) => {
          if (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
          }
          if (reqResults.rowCount === 0) {
            return res.status(404).json({ error: 'Request not found' })
          } else {
            pool.query(
              queries.assignRequestToEmployee,
              [employeeId, requestId],
              (error, assignResults) => {
                if (error) {
                  return res
                    .status(500)
                    .json({ error: 'Internal Server Error' })
                }
                if (assignResults.rowCount === 0) {
                  return res
                    .status(500)
                    .json({ error: 'Request could not be assigned' })
                } else {
                  const assignedRequest = reqResults.rows[0]
                  assignedRequest.employee_id = employeeId
                  res.status(200).json({
                    message: 'Request assigned to employee successfully',
                    request: assignedRequest
                  })
                }
              }
            )
          }
        })
      }
    }
  )
}

const deleteRquest = (req, res) => {
  const reqid = parseInt(req.params.request_id)
  pool.query(queries.getRequestByID, [reqid], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (result.rows.length === 0) {
      return res.status(200)
    }
    pool.query(queries.deleteRequest, [reqid], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      res.status(200)
    })
  })
}

const updateRequestStatus = async (req, res) => {
  console.log('Update Request Status')
  const requestId = parseInt(req.params.reqid)
  const { status } = req.body

  try {
    const requestExists = await pool.query(queries.getRequestByID, [requestId])
    if (requestExists.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' })
    }

    const updatedRequest = await pool.query(queries.updateRequestStatus, [
      status,
      requestId
    ])

    if (updatedRequest.rowCount === 0) {
      return res.status(404).json({ error: 'Status could not be updated' })
    }

    const updatedRequestData = updatedRequest.rows[0]
    return res.status(200).json({
      message: 'Request status updated successfully',
      request: updatedRequestData
    })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllRequests,
  getRequestByID,
  getRequestsByEmpID,
  getRequestsByUserID,
  addRequest,
  assignRequestToEmployee,
  deleteRquest,
  updateRequestStatus
}
