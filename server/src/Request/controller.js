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
  const request_id = req.query.reqid
  pool.query(queries.getRequestByID, [request_id], (error, results) => {
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
  const employee_id = req.query.empid
  pool.query(queries.checkIfEmployeeExists, [employee_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    } else {
      pool.query(queries.getRequestsByEmpID, [employee_id], (error, results) => {
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
  const user_id = req.query.userid
  pool.query(queries.checkIfUserExists, [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' })
    } else {
      pool.query(queries.getRequestsByUserID, [user_id], (error, results) => {
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
  const empid = null;
  const status = "Received";
  try {
    const userExists = await pool.query(queries.checkIfUserExists, [user_id])
    if (userExists.rows.length === 0) {
      return res.status(404).send('User Not Found')
    } else {
      const reqResults = await pool.query(queries.addRequest, [
        empid,
        user_id,
        description,
        type,
        status
      ])
      if (reqResults.rowCount === 0) {
        return res.status(500).json({ error: 'Request could not be created' })
      } else {
        const createdRequest = reqResults.rows[0]
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
  const request_id = parseInt(req.params.request_id)
  const employee_id = parseInt(req.body.employee_id)

  pool.query(
    queries.checkIfEmployeeExists,
    [employee_id],
    (error, empResults) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      if (empResults.rowCount === 0) {
        return res.status(404).json({ error: 'Employee not found' })
      } else {
        pool.query(queries.getRequestByID, [request_id], (error, reqResults) => {
          if (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
          }
          if (reqResults.rowCount === 0) {
            return res.status(404).json({ error: 'Request not found' })
          } else {
            pool.query(
              queries.assignRequestToEmployee,
              [employee_id, request_id],
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
                  assignedRequest.employee_id = employee_id
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
  const request_id = parseInt(req.params.request_id);
  pool.query(queries.getRequestByID, [request_id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error checking if request exists'});
    }
    if (result.rows.length === 0) {
      // Request not found, return 404
      return res.status(404).json({ error: 'Request not found' });
    }
    // Request exists, proceed with deletion
    pool.query(queries.deleteRequest, [request_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Could Not Delete Request' });
      }
      // Request deleted successfully, return 200
      return res.status(200).json({ message: 'Request deleted successfully' });
    });
  });
};


const updateRequestStatus = async (req, res) => {
  console.log('Update Request Status');
  const request_id = parseInt(req.params.request_id);
  const status = req.body.status;

  try {
    const requestExists = await pool.query(queries.getRequestByID, [request_id]);
    console.log(requestExists);
    if (requestExists.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Update the request status
    await pool.query(queries.updateRequestStatus, [status, request_id]);
    
    // Get the updated request
    const updatedReq = await pool.query(queries.getRequestByID, [request_id]);
    console.log("-----------------------------------------------------");
    console.log(updatedReq);
    
    // Extract the updated request data
    const updatedRequestData = updatedReq.rows[0];

    return res.status(200).json({
      message: 'Request status updated successfully',
      request: updatedRequestData
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateRequest = async (req, res) => {
  const request_id = req.params.request_id
  const { employee_id, user_id, description, type, status } = req.body
  if (!employee_id && !user_id && !description && !type && !status) {
    return res
      .status(400)
      .json({ error: 'At least one field is required for updating' })
  }

  const setClauses = []
  const values = []

  if (employee_id) {
    setClauses.push('employee_id = $' + (values.length + 1))
    values.push(employee_id)
  }
  if (user_id) {
    setClauses.push('user_id = $' + (values.length + 1))
    values.push(user_id)
  }
  if (description) {
    setClauses.push('description = $' + (values.length + 1))
    values.push(description)
  }
  if (type) {
    setClauses.push('type = $' + (values.length + 1))
    values.push(type)
  }
  if (status) {
    setClauses.push('status = $' + (values.length + 1))
    values.push(status)
  }

  const query = `UPDATE request SET ${setClauses.join(
    ', '
  )} WHERE request_id = $${values.length + 1}`

  pool.query(queries.getRequestByID, [request_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Request not found' })
    } else {
      pool.query(query, [...values, request_id], (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
        }
        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'request not found' })
        }
        pool.query(queries.getRequestByID, [request_id], (error, results) => {
          if (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
          }
          res.status(201).json({
            message: 'Request Updated Successfully!',
            employee: results.rows
          })
        })
      })
    }
  })
}

module.exports = {
  getAllRequests,
  getRequestByID,
  getRequestsByEmpID,
  getRequestsByUserID,
  addRequest,
  assignRequestToEmployee,
  deleteRquest,
  updateRequestStatus,
  updateRequest
}
