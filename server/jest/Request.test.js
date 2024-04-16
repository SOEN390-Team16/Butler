const pool = require('../db')
const queries = require('../src/Request/queries')
const { getAllRequests, getRequestByID, getRequestsByEmpID, getRequestsByUserID,addRequest,
        assignRequestToEmployee, deleteRequest, updateRequestStatus, updateRequest } = require('../src/Request/controller') 

// Mock pool.query function
jest.mock('../db', () => ({
  query: jest.fn(),
}))

describe('getAllRequests function', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all requests when there are requests in the database', async () => {
    const mockResults = { rows: [{ id: 1, request: 'Sample request' }] }
    pool.query.mockImplementationOnce((query, callback) => {
      callback(null, mockResults)
    })

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getAllRequests(null, mockResponse)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(mockResults.rows)
  })

  it('should return 404 error when there are no requests in the database', async () => {
    const mockResults = { rowCount: 0 }
    pool.query.mockImplementationOnce((query, callback) => {
      callback(null, mockResults)
    })

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getAllRequests(null, mockResponse)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No Requests Found' })
  })

  it('should return 500 error when there is an internal server error', async () => {
    const mockError = new Error('Internal Server Error')
    pool.query.mockImplementationOnce((query, callback) => {
      callback(mockError, null)
    })

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getAllRequests(null, mockResponse)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})

describe('getRequestByID function', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a specific request when it exists in the database', async () => {
    const mockRequestID = 123
    const mockResults = { rows: [{ id: mockRequestID, request: 'Sample request' }] }
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResults)
    })

    const mockRequest = { query: { reqid: mockRequestID } }
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getRequestByID(mockRequest, mockResponse)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function))
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(mockResults.rows)
  })

  it('should return 404 error when the request does not exist in the database', async () => {
    const mockRequestID = 123
    const mockResults = { rowCount: 0 }
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResults)
    })

    const mockRequest = { query: { reqid: mockRequestID } }
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getRequestByID(mockRequest, mockResponse)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function))
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Request Not Found' })
  })

  it('should return 500 error when there is an internal server error', async () => {
    const mockRequestID = 123
    const mockError = new Error('Internal Server Error')
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(mockError, null)
    })

    const mockRequest = { query: { reqid: mockRequestID } }
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getRequestByID(mockRequest, mockResponse)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function))
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})

describe('getRequestsByEmpID function', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    it('should return requests associated with a specific employee when the employee exists and has requests', async () => {
      const mockEmployeeID = 123
      const mockResults = { rows: [{ id: 1, request: 'Sample request' }] }
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfEmployeeExists) {
          callback(null, { rowCount: 1 }) // Employee exists
        } else if (query === queries.getRequestsByEmpID) {
          callback(null, mockResults)
        }
      })
  
      const mockRequest = { query: { empid: mockEmployeeID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByEmpID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockResults.rows)
    })
  
    it('should return 404 error when the employee does not exist', async () => {
      const mockEmployeeID = 123
      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rowCount: 0 }) // Employee does not exist
      })
  
      const mockRequest = { query: { empid: mockEmployeeID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByEmpID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Employee not found' })
    })
  
    it('should return 200 with an empty array when the employee exists but has no requests associated with them', async () => {
      const mockEmployeeID = 123
      const mockResults = { rows: []  }
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfEmployeeExists) {
          callback(null, { rowCount: 1 }) // Employee exists
        } else if (query === queries.getRequestsByEmpID) {
          callback(null, mockResults) // Employee has no requests
        }
      })
  
      const mockRequest = { query: { empid: mockEmployeeID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByEmpID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith([])
    })
  
    it('should return 500 error when there is an internal server error', async () => {
      const mockEmployeeID = 123
      const mockError = new Error('Internal Server Error')
      pool.query.mockImplementation((query, params, callback) => {
        callback(mockError, null)
      })
  
      const mockRequest = { query: { empid: mockEmployeeID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByEmpID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
    })
  })

  describe('getRequestsByUserID function', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    it('should return requests associated with a specific user when the user exists and has requests', async () => {
      const mockUserID = 123
      const mockResults = { rows: [{ id: 1, request: 'Sample request' }] }
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfUserExists) {
          callback(null, { rowCount: 1 }) // User exists
        } else if (query === queries.getRequestsByUserID) {
          callback(null, mockResults)
        }
      })
  
      const mockRequest = { query: { userid: mockUserID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByUserID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockResults.rows)
    })
  
    it('should return 404 error when the user does not exist', async () => {
      const mockUserID = 123
      pool.query.mockImplementation((query, params, callback) => {
        callback(null, { rowCount: 0 }) // User does not exist
      })
  
      const mockRequest = { query: { userid: mockUserID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByUserID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User not found' })
    })
  
    it('should return 200 with an empty array when the user exists but has no requests associated with them', async () => {
      const mockUserID = 123
      const mockResults = { rows: []  }
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfUserExists) {
          callback(null, { rowCount: 1 }) // User exists
        } else if (query === queries.getRequestsByUserID) {
          callback(null, mockResults) // User has no requests
        }
      })
    
      const mockRequest = { query: { userid: mockUserID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByUserID(mockRequest, mockResponse)
    
      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith([])
    })
    
  
    it('should return 500 error when there is an internal server error', async () => {
      const mockUserID = 123
      const mockError = new Error('Internal Server Error')
      pool.query.mockImplementation((query, params, callback) => {
        callback(mockError, null)
      })
  
      const mockRequest = { query: { userid: mockUserID } }
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await getRequestsByUserID(mockRequest, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
    })
  })

  describe('addRequest function', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    it('should successfully add a request when user exists', async () => {
      const mockUserID = 123
      const mockRequestBody = {
        body: {
          user_id: mockUserID,
          description: 'Sample description',
          type: 'Sample type',
        },
      }
      const mockUserExistsResult = { rows: [{ id: mockUserID }] }
      const mockRequestResult = { rowCount: 1, rows: [{ id: 1 }] }
      pool.query.mockImplementation((query, params) => {
        if (query === queries.checkIfUserExists) {
          return Promise.resolve(mockUserExistsResult)
        } else if (query === queries.addRequest) {
          return Promise.resolve(mockRequestResult)
        }
      })
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await addRequest(mockRequestBody, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfUserExists, [mockUserID])
      expect(pool.query).toHaveBeenCalledWith(
        queries.addRequest,
        [null, mockUserID, 'Sample description', 'Sample type', 'Received']
      )
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Request Created Successfully',
        request: mockRequestResult.rows[0],
      })
    })
  
    it('should return 404 error when user does not exist', async () => {
      const mockUserID = 123
      const mockRequestBody = {
        body: {
          user_id: mockUserID,
          description: 'Sample description',
          type: 'Sample type',
        },
      }
      const mockUserExistsResult = { rows: [] }
      pool.query.mockResolvedValue(mockUserExistsResult)
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }
      await addRequest(mockRequestBody, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfUserExists, [mockUserID])
      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(mockResponse.send).toHaveBeenCalledWith('User Not Found')
    })
  
    it('should return 500 error when request could not be created', async () => {
      const mockUserID = 123
      const mockRequestBody = {
        body: {
          user_id: mockUserID,
          description: 'Sample description',
          type: 'Sample type',
        },
      }
      const mockUserExistsResult = { rows: [{ id: mockUserID }] }
      const mockRequestResult = { rowCount: 0 }
      pool.query.mockImplementation((query, params) => {
        if (query === queries.checkIfUserExists) {
          return Promise.resolve(mockUserExistsResult)
        } else if (query === queries.addRequest) {
          return Promise.resolve(mockRequestResult)
        }
      })
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await addRequest(mockRequestBody, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfUserExists, [mockUserID])
      expect(pool.query).toHaveBeenCalledWith(
        queries.addRequest,
        [null, mockUserID, 'Sample description', 'Sample type', 'Received']
      )
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Request could not be created' })
    })
  
    it('should return 500 error when there is an internal server error', async () => {
      const mockUserID = 123
      const mockRequestBody = {
        body: {
          user_id: mockUserID,
          description: 'Sample description',
          type: 'Sample type',
        },
      }
      const mockError = new Error('Internal Server Error')
      pool.query.mockRejectedValue(mockError)
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await addRequest(mockRequestBody, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfUserExists, [mockUserID])
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
    })
  })

  describe('assignRequestToEmployee function', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    it('should successfully assign a request to an employee when both employee and request exist', async () => {
      const mockRequestID = 123
      const mockEmployeeID = 456
      const mockRequestBody = {
        params: { request_id: mockRequestID },
        body: { employee_id: mockEmployeeID },
      }
      const mockEmployeeExistsResult = { rowCount: 1 }
      const mockRequestExistsResult = { rowCount: 1, rows: [{ id: mockRequestID }] }
      const mockAssignResults = { rowCount: 1 }
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfEmployeeExists) {
          callback(null, mockEmployeeExistsResult)
        } else if (query === queries.getRequestByID) {
          callback(null, mockRequestExistsResult)
        } else if (query === queries.assignRequestToEmployee) {
          callback(null, mockAssignResults)
        }
      })
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await assignRequestToEmployee(mockRequestBody, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(3)
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfEmployeeExists, [mockEmployeeID], expect.any(Function))
      expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function))
      expect(pool.query).toHaveBeenCalledWith(
        queries.assignRequestToEmployee,
        [mockEmployeeID, mockRequestID],
        expect.any(Function)
      )
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Request assigned to employee successfully',
        request: { id: mockRequestID, employee_id: mockEmployeeID },
      })
    })
  
    it('should return 404 error when employee does not exist', async () => {
        const mockRequestID = 123;
        const mockEmployeeID = 456;
        const mockRequestBody = {
          params: { request_id: mockRequestID },
          body: { employee_id: mockEmployeeID },
        };
        const mockEmployeeExistsResult = { rowCount: 0 };
      
        // Mocking pool.query to properly handle the query
        pool.query.mockImplementation((query, params, callback) => {
          callback(null, mockEmployeeExistsResult);
        });
      
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Execute the function under test
        await assignRequestToEmployee(mockRequestBody, mockResponse);
      
        // Verify the behavior
        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(pool.query).toHaveBeenCalledWith(queries.checkIfEmployeeExists, [mockEmployeeID], expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Employee not found' });
      });
      
  
    it('should return 404 error when request does not exist', async () => {
        const mockRequestID = 123;
        const mockEmployeeID = 456;
        const mockRequestBody = {
          params: { request_id: mockRequestID },
          body: { employee_id: mockEmployeeID },
        };
        const mockEmployeeExistsResult = { rowCount: 1 };
        const mockRequestExistsResult = { rowCount: 0 };
      
        // Mocking pool.query to properly handle both queries
        pool.query.mockImplementation((query, params, callback) => {
          if (query === queries.checkIfEmployeeExists) {
            callback(null, mockEmployeeExistsResult);
          } else if (query === queries.getRequestByID) {
            callback(null, mockRequestExistsResult);
          }
        });
      
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Execute the function under test
        await assignRequestToEmployee(mockRequestBody, mockResponse);
      
        // Verify the behavior
        expect(pool.query).toHaveBeenCalledTimes(2);
        expect(pool.query).toHaveBeenCalledWith(queries.checkIfEmployeeExists, [mockEmployeeID], expect.any(Function));
        expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Request not found' });
      });
      
      
  
    it('should return 500 error when request could not be assigned', async () => {
      const mockRequestID = 123
      const mockEmployeeID = 456
      const mockRequestBody = {
        params: { request_id: mockRequestID },
        body: { employee_id: mockEmployeeID },
      }
      const mockEmployeeExistsResult = { rowCount: 1 }
      const mockRequestExistsResult = { rowCount: 1 }
      const mockAssignResults = { rowCount: 0 }
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfEmployeeExists) {
          callback(null, mockEmployeeExistsResult)
        } else if (query === queries.getRequestByID) {
          callback(null, mockRequestExistsResult)
        } else if (query === queries.assignRequestToEmployee) {
          callback(null, mockAssignResults)
        }
      })
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      await assignRequestToEmployee(mockRequestBody, mockResponse)
  
      expect(pool.query).toHaveBeenCalledTimes(3)
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfEmployeeExists, [mockEmployeeID], expect.any(Function))
      expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function))
      expect(pool.query).toHaveBeenCalledWith(
        queries.assignRequestToEmployee,
        [mockEmployeeID, mockRequestID],
        expect.any(Function)
      )
      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Request could not be assigned' })
    })
  
    it('should return 500 error when there is an internal server error', async () => {
        const mockRequestID = 123
        const mockEmployeeID = 456
        const mockRequestBody = {
          params: { request_id: mockRequestID },
          body: { employee_id: mockEmployeeID },
        }
        const mockError = new Error('Internal Server Error');
      
        // Mocking pool.query to reject the promise with the mock error
        pool.query.mockImplementation((query, params, callback) => {
          callback(mockError); // Simulate an internal server error
        });
      
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        }
      
        // Execute the function under test
        await assignRequestToEmployee(mockRequestBody, mockResponse)
      
        // Verify the behavior
        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(pool.query).toHaveBeenCalledWith(queries.checkIfEmployeeExists, [mockEmployeeID], expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      })
      
  })

  describe('deleteRequest function', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
      
      it('should return 500 error when error occurs during deletion', async () => {
        const mockRequestID = 123;
        const mockError = new Error('Could Not Delete Request');
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mocking pool.query to simulate error
        pool.query.mockImplementationOnce((query, params, callback) => {
          callback(mockError);
        });
      
        await deleteRequest({ params: { request_id: mockRequestID } }, mockResponse);
      
        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function));
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error checking if request exists' });
      });
      
  
    it('should return 500 error when error occurs during deletion', async () => {
      const mockRequestID = 123;
      const mockError = new Error('Could Not Delete Request');
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      pool.query.mockImplementationOnce((query, params, callback) => {
        callback(null, { rows: [{ id: mockRequestID }] });
      });
      pool.query.mockImplementationOnce((query, params, callback) => {
        callback(mockError);
      });
  
      await deleteRequest({ params: { request_id: mockRequestID } }, mockResponse);
  
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function));
      expect(pool.query).toHaveBeenCalledWith(queries.deleteRequest, [mockRequestID], expect.any(Function));
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Could Not Delete Request' });
    });
  
    it('should return 200 when request is deleted successfully', async () => {
      const mockRequestID = 123;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      pool.query.mockImplementationOnce((query, params, callback) => {
        callback(null, { rows: [{ id: mockRequestID }] });
      });
      pool.query.mockImplementationOnce((query, params, callback) => {
        callback(null);
      });
  
      await deleteRequest({ params: { request_id: mockRequestID } }, mockResponse);
  
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID], expect.any(Function));
      expect(pool.query).toHaveBeenCalledWith(queries.deleteRequest, [mockRequestID], expect.any(Function));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Request deleted successfully' });
    });
  });


describe('updateRequestStatus function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 error when request does not exist', async () => {
    const mockRequestID = 123;
    const mockStatus = 'Approved';
    const mockError = new Error('Request not found');
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to simulate request not found
    pool.query.mockImplementationOnce((query, params) => {
      if (query === queries.getRequestByID) {
        return { rows: [] };
      }
    });

    await updateRequestStatus({ params: { request_id: mockRequestID }, body: { status: mockStatus } }, mockResponse);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID]);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Request not found' });
  });

  it('should return 500 error when an internal server error occurs', async () => {
    const mockRequestID = 123;
    const mockStatus = 'Approved';
    const mockError = new Error('Internal Server Error');
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to simulate internal server error
    pool.query.mockImplementationOnce((query, params) => {
      if (query === queries.getRequestByID) {
        throw mockError;
      }
    });

    await updateRequestStatus({ params: { request_id: mockRequestID }, body: { status: mockStatus } }, mockResponse);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith(queries.getRequestByID, [mockRequestID]);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('should update request status successfully', async () => {
    const mockRequestID = 123;
    const mockStatus = 'Approved';
    const mockUpdatedRequest = { id: mockRequestID, status: mockStatus };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to simulate successful request update
    pool.query.mockImplementation((query, params) => {
      if (query === queries.getRequestByID) {
        return { rows: [mockUpdatedRequest] };
      } else if (query === queries.updateRequestStatus) {
        return;
      }
    });

    await updateRequestStatus({ params: { request_id: mockRequestID }, body: { status: mockStatus } }, mockResponse);

    expect(pool.query).toHaveBeenCalledTimes(3);
    expect(pool.query).toHaveBeenCalledWith(queries.updateRequestStatus, [mockStatus, mockRequestID]);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Request status updated successfully',
      request: mockUpdatedRequest
    });
  });
});

describe('updateRequest function', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 400 error if no fields are provided for updating', async () => {
      const mockRequestID = 123;
      const mockRequest = {
        params: { request_id: mockRequestID },
        body: {},
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateRequest(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'At least one field is required for updating' });
    });
  
    it('should update request successfully', async () => {
        const mockRequestID = 123;
        const mockEmployeeID = 456;
        const mockRequest = {
          params: { request_id: mockRequestID },
          body: { employee_id: mockEmployeeID },
        };
        const mockUpdatedRequest = { id: mockRequestID, employee_id: mockEmployeeID };
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mocking pool.query to simulate successful request update
        pool.query.mockImplementation((query, params, callback) => {
          if (query === queries.getRequestByID) {
            // Mocking a successful retrieval of the request
            callback(null, { rows: [mockUpdatedRequest] });
          } else if (query.includes('UPDATE request')) {
            // Mocking a successful update of the request
            callback(null, { rowCount: 1 });
          }
        });
      
        await updateRequest(mockRequest, mockResponse);
      
        expect(pool.query).toHaveBeenCalledTimes(3);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: 'Request Updated Successfully!',
          employee: [mockUpdatedRequest]
        });
      });      
  });
