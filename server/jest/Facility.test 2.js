const pool = require('../db');
const queries = require('../src/Facility/queries');
const {
  getAllFacilities,
  getFacilityById,
  getFacilityByPropertyId,
  addFacility,
  removeFacility,
  updateFacility
} = require('../src/Facility/controller');

// Mock the pool.query function
jest.mock('../db', () => ({
  query: jest.fn(),
}));

describe('getAllFacilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all facilities on success', async () => {
    const mockFacilities = { rows: [{
      "facility_id": 1,
      "property_id": 10,
      "name": "Sauna",
      "description": "shiii gets hot"
    },
    {
      "facility_id": 2,
      "property_id": 10,
      "name": "Lounge",
      "description": "shiii gets drunk"
    }] };

    pool.query.mockImplementationOnce((query, callback) => {
      callback(null, mockFacilities)
    })
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllFacilities(null, res);
    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFacilities.rows);
  });

  it('should return 404 if no facilities are found', async () => {
    const mockFacilities = { rowCount: 0 }
    pool.query.mockImplementationOnce((query, callback) => {
      callback(null, mockFacilities)
    })

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllFacilities(null, res);
    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Facility not found' });
  });

  it('should return 500 on database error', async () => {
    const mockError = new Error('Internal Server Error')
    pool.query.mockImplementationOnce((query, callback) => {
      callback(mockError, null)
    })
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllFacilities(null, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });

  });
});


// #### Test for `getFacilityById`

describe('getFacilityById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return facility details when found', async () => {
    const mockFacilityId = 1;
    const mockFacility = {
      rows: [{
        "facilityid": mockFacilityId,
        "property_id": 10,
        "name": "Sauna",
        "description": "shiii gets hot"
      }],
      rowCount: 1
    };
  
    // Correctly setting up the mock to simulate the callback behavior
    pool.query.mockImplementation((query, params, callback) => {
      expect(params).toEqual([mockFacilityId]); // Ensure parameters are as expected
      callback(null, mockFacility); // Simulate successful database response
    });
  
    const req = { params: { facilityid: mockFacilityId.toString() } }; // Assuming params should be strings if they are in URL
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await getFacilityById(req, res);
  
    expect(pool.query).toHaveBeenCalledWith(queries.getFacilityById, [mockFacilityId], expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFacility.rows[0]);
  });
  

  it('should return 404 if facility is not found', async () => {
    const mockFacilityId = 1;
  
    const req = { params: { facilityid: mockFacilityId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // Update mock to correctly handle the callback
    pool.query.mockImplementation((query, params, callback) => {
      if (query === queries.getFacilityById) {
        // Ensure the callback is called with no results
        callback(null, { rows: [], rowCount: 0 });
      }
    });
  
    await getFacilityById(req, res);
  
    // Verify that pool.query was called correctly
    expect(pool.query).toHaveBeenCalledWith(queries.getFacilityById, [mockFacilityId], expect.any(Function));
    // Verify that the response methods are called correctly
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Facility not found' });
  });
  

  it('should return 500 on database error', async () => {
    const mockfacilityId = 1;
    const mockError = new Error('Internal Server Error')
    pool.query.mockImplementation((query, params, callback) => {
      callback(mockError, null)
    })

    const req = {  params: {facilityid: mockfacilityId} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getFacilityById(req, res)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

  });
});

// #### Test for `getFacilityByPropertyId`

describe('getFacilityByPropertyId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return facility details when found by property id', async () => {
    const mockFacilityPropertyId = 1;
    const mockFacility = {
      rows: [{
        "facilityid": 1,
        "property_id": mockFacilityPropertyId,
        "name": "Sauna",
        "description": "shiii gets hot"
      }],
      rowCount: 1
    };
    // Correctly setting up the mock to simulate the callback behavior
    pool.query.mockImplementation((query, params, callback) => {
      expect(params).toEqual([mockFacilityPropertyId]); // Ensure parameters are as expected
      callback(null, mockFacility); // Simulate successful database response
    });
  
    const req = { params: { propertyid: mockFacilityPropertyId.toString() } }; // Assuming params should be strings if they are in URL
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await getFacilityByPropertyId(req, res);
  
    expect(pool.query).toHaveBeenCalledWith(queries.getFacilityByPropertyId, [mockFacilityPropertyId], expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFacility.rows); 
  });
  

  it('should return 404 if facility is not found by property id', async () => {
    const mockFacilityPropertyId = 1;
  
    const req = { params: { propertyid: mockFacilityPropertyId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // Update mock to correctly handle the callback
    pool.query.mockImplementation((query, params, callback) => {
      if (query === queries.getFacilityByPropertyId) {
        // Ensure the callback is called with no results
        callback(null, { rows: [], rowCount: 0 });
      }
    });
  
    await getFacilityByPropertyId(req, res);
  
    // Verify that pool.query was called correctly
    expect(pool.query).toHaveBeenCalledWith(queries.getFacilityByPropertyId, [mockFacilityPropertyId], expect.any(Function));
    // Verify that the response methods are called correctly
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Facility not found' });
  });
  

  it('should return 500 on database error ', async () => {
    const mockFacilityPropertyId = 1;
    const mockError = new Error('Internal Server Error')
    pool.query.mockImplementation((query, params, callback) => {
      callback(mockError, null)
    })

    const req = {  params: {propertyid: mockFacilityPropertyId} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await getFacilityByPropertyId(req, res)

    expect(pool.query).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })

  });
});

describe('addFacility', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a facility successfully', async () => {
    const newFacilityData = {
      facility_id: 111,
      property_id: 10,
      name: "Sauna",
      description: "shiiiiiii gets hot"
    };
  
    const mockFacilityExistsResult = { rows: [], rowCount: 0 }; // No facility exists
    const mockRequestResult = { rowCount: 1, rows: [{ id: 1 }] }; // Mock successful addition
  
    // Use mockImplementationOnce for sequential calls
    pool.query
      .mockImplementationOnce((query, params, callback) => callback(null, mockFacilityExistsResult)) // First call: check existence
      .mockImplementationOnce((query, params, callback) => callback(null, mockRequestResult)); // Second call: add facility
  
    const req = {
      body: newFacilityData
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await addFacility(req, res);
  
    // Check if the correct queries were called
    expect(pool.query).toHaveBeenCalledWith(queries.checkIfFacilityExistsByDetails, [newFacilityData.property_id, newFacilityData.name, newFacilityData.description], expect.any(Function));
    expect(pool.query).toHaveBeenCalledWith(queries.addFacility, [newFacilityData.property_id, newFacilityData.name, newFacilityData.description], expect.any(Function));
  
    // Check if the correct status and responses were issued
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Facility added successfully' });
  });
  

  it('should return 400 if facility already exists', async () => {
    const newFacilityData = { property_id: 1, name: 'New Gym', description: 'A brand new gym' };
    
    // Mocking the database query to simulate that a facility already exists
    pool.query.mockImplementation((query, values, callback) => {
      if (query.startsWith('SELECT')) {
        // Simulate that a facility already exists
        callback(null, { rowCount: 1 });
      } else {
        callback(null); // Simulate successful insertion
      }
    });
  
    const req = { body: newFacilityData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await addFacility(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Facility already exists' });
  });
});

describe('removeFacility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should remove a facility when it exists', async () => {
    const facilityId = 1;
    const req = { params: { facilityid: facilityId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the facility existence check
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.checkIfFacilityExists);
      expect(params).toEqual([facilityId]);
      callback(null, { rowCount: 1 });
    });

    // Mocking the facility removal
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.removeFacility);
      expect(params).toEqual([facilityId]);
      callback(null);
    });

    await removeFacility(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Facility removed successfully' });
  });

  it('should return 400 if facility does not exist', async () => {
    const facilityId = 1;
    const req = { params: { facilityid: facilityId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the facility existence check
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.checkIfFacilityExists);
      expect(params).toEqual([facilityId]);
      callback(null, { rowCount: 0 });
    });

    await removeFacility(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Facility doesn\'t exist' });
  });

  it('should return 500 if an internal server error occurs', async () => {
    const facilityId = 1;
    const req = { params: { facilityid: facilityId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking an internal server error during facility existence check
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error('Internal Server Error'));
    });

    await removeFacility(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('updateFacility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a facility when it exists', async () => {
    const facilityId = 1;
    const req = {
      params: { facilityid: facilityId.toString() },
      body: { property_id: 1, name: 'Updated Gym', description: 'Updated description' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the facility existence check
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.checkIfFacilityExists);
      expect(params).toEqual([facilityId]);
      callback(null, { rowCount: 1 });
    });

    // Mocking the facility update
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.updateFacility);
      expect(params).toEqual([req.body.property_id, req.body.name, req.body.description, facilityId]);
      callback(null);
    });

    await updateFacility(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Facility updated successfully' });
  });

  it('should return 404 if facility does not exist', async () => {
    const facilityId = 1;
    const req = {
      params: { facilityid: facilityId.toString() },
      body: { property_id: 1, name: 'Updated Gym', description: 'Updated description' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the facility existence check
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.checkIfFacilityExists);
      expect(params).toEqual([facilityId]);
      callback(null, { rowCount: 0 });
    });

    await updateFacility(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Facility not found' });
  });

  it('should return 500 if an internal server error occurs', async () => {
    const facilityId = 1;
    const req = {
      params: { facilityid: facilityId.toString() },
      body: { property_id: 1, name: 'Updated Gym', description: 'Updated description' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking an internal server error during facility existence check
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error('Internal Server Error'));
    });

    await updateFacility(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

