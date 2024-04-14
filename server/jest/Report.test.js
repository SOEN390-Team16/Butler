const {
    checkIfPropertyExists,
  checkIfCompanyExists,
  getAnnualReport,
  getTotalOperationCosts,
  getTotalCondoFeesCollected,
  getEverythingAtOnceByPropertyId,
  getEverythingAtOnceByCompanyId
} = require('../src/Report/controller');

const pool = require('../db');
const queries = require('../src/Report/queries');

jest.mock('../db', () => ({
query: jest.fn(),
}));
  
describe('GET /totalCondoFees/:property_id', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mocks after each test
    });
  
    it('should return total condo fees collected when property exists', async () => {
      const mockPropertyId = 1;
      const mockTotalFees = {
        rows: [{
          "total_fees_collected": 1000
        }],
        rowCount: 1
      };
    
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(null, mockTotalFees); // Simulate successful database response
      });
    
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    
      await getTotalCondoFeesCollected(req, res);
    
      expect(pool.query).toHaveBeenCalledWith(queries.getTotalCondoFeesCollected, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTotalFees.rows);
    });
  
    it('should return 404 when property does not exist', async () => {
      const mockPropertyId = 9999;
      const mockEmptyResult = {
        rows: [],
        rowCount: 0
      };
    
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(null, mockEmptyResult); // Simulate property not found
      });
    
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    
      await getTotalCondoFeesCollected(req, res);
    
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
  
    it('should return 500 when encountering internal server error', async () => {
      const mockPropertyId = 1;
    
      // Mocking pool.query to simulate internal server error
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(new Error('Mocked error'), null); // Simulate internal server error
      });
    
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    
      await getTotalCondoFeesCollected(req, res);
    
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
  describe('GET /totalOperationCosts/:property_id/:year', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mocks after each test
    });
  
    it('should return total operation costs for a specific year when property exists and year is provided', async () => {
      const mockPropertyId = 1;
      const mockYear = 2023;
      const mockOperationCosts = {
        rows: [{
          "total_operation_costs": 5000
        }],
        rowCount: 1
      };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfPropertyExists) {
          expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
          callback(null, { rowCount: 1 }); // Simulate property found
        } else if (query === queries.getTotalOperationCostsByYear) {
          expect(params).toEqual([mockPropertyId, mockYear]); // Ensure parameters are as expected
          callback(null, mockOperationCosts); // Simulate successful database response
        }
      });
  
      const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getTotalOperationCosts(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.getTotalOperationCostsByYear, [mockPropertyId, mockYear], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOperationCosts.rows);
    });
  
    it('should return total operation costs when property exists and year is not provided', async () => {
      const mockPropertyId = 1;
      const mockOperationCosts = {
        rows: [{
          "total_operation_costs": 15000
        }],
        rowCount: 1
      };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfPropertyExists) {
          expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
          callback(null, { rowCount: 1 }); // Simulate property found
        } else if (query === queries.getTotalOperationCosts) {
          expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
          callback(null, mockOperationCosts); // Simulate successful database response
        }
      });
  
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getTotalOperationCosts(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.getTotalOperationCosts, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOperationCosts.rows);
    });
  
    it('should return 404 when property does not exist', async () => {
      const mockPropertyId = 9999;
      const mockEmptyResult = { rowCount: 0 };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(null, mockEmptyResult); // Simulate property not found
      });
  
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getTotalOperationCosts(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
  
    it('should return 500 when encountering internal server error', async () => {
      const mockPropertyId = 1;
      const mockYear = 2023;
  
      // Mocking pool.query to simulate internal server error
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(new Error('Mocked error'), null); // Simulate internal server error
      });
  
      const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getTotalOperationCosts(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('GET /annualReport/:property_id/:year', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mocks after each test
    });
  
    it('should return annual report when property exists and year is provided', async () => {
      const mockPropertyId = 1;
      const mockYear = 2023;
      const mockReport = {
        rows: [{ /* Mocked report data */ }],
        rowCount: 1
      };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfPropertyExists) {
          expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
          callback(null, { rowCount: 1 }); // Simulate property found
        } else if (query === queries.getAnnualReport) {
          expect(params).toEqual([mockPropertyId, mockYear]); // Ensure parameters are as expected
          callback(null, mockReport); // Simulate successful database response
        }
      });
  
      const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getAnnualReport(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.getAnnualReport, [mockPropertyId, mockYear], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReport.rows);
    });
  
    it('should return 404 when property does not exist', async () => {
      const mockPropertyId = 9999;
      const mockEmptyResult = { rowCount: 0 };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(null, mockEmptyResult); // Simulate property not found
      });
  
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getAnnualReport(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
  
    it('should return 500 when encountering internal server error', async () => {
      const mockPropertyId = 1;
      const mockYear = 2023;
  
      // Mocking pool.query to simulate internal server error
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(new Error('Mocked error'), null); // Simulate internal server error
      });
  
      const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getAnnualReport(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
describe('GET /everythingAtOnce/:property_id/:year', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it('should return total condo fees collected, total operational costs for the year, and annual report when property exists and year is provided', async () => {
    const mockPropertyId = 1;
    const mockYear = 2023;
    const mockResult = {
      rows: [{ /* Mocked data */ }],
      rowCount: 1
    };

    // Mocking pool.query to simulate the callback behavior
    pool.query.mockImplementation((query, params, callback) => {
      if (query === queries.checkIfPropertyExists) {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(null, { rowCount: 1 }); // Simulate property found
      } else if (query === queries.getEverythingAtOnceByPropertyId) {
        expect(params).toEqual([mockPropertyId, mockYear]); // Ensure parameters are as expected
        callback(null, mockResult); // Simulate successful database response
      }
    });

    const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getEverythingAtOnceByPropertyId(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.getEverythingAtOnceByPropertyId, [mockPropertyId, mockYear], expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult.rows);
  });

  it('should return 404 when property does not exist', async () => {
    const mockPropertyId = 9999;
    const mockEmptyResult = { rowCount: 0 };

    // Mocking pool.query to simulate the callback behavior
    pool.query.mockImplementation((query, params, callback) => {
      expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
      callback(null, mockEmptyResult); // Simulate property not found
    });

    const req = { params: { property_id: mockPropertyId.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getEverythingAtOnceByPropertyId(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
  });

  it('should return 500 when encountering internal server error', async () => {
    const mockPropertyId = 1;
    const mockYear = 2023;

    // Mocking pool.query to simulate internal server error
    pool.query.mockImplementation((query, params, callback) => {
      expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
      callback(new Error('Mocked error'), null); // Simulate internal server error
    });

    const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getEverythingAtOnceByPropertyId(req, res);

    expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
  
describe('GET /everythingAtOnce/:property_id/:year', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mocks after each test
    });
  
    it('should return total condo fees collected, total operational costs for the year, and annual report when property exists and year is provided', async () => {
      const mockPropertyId = 1;
      const mockYear = 2023;
      const mockResult = {
        rows: [{ /* Mocked data */ }],
        rowCount: 1
      };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfPropertyExists) {
          expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
          callback(null, { rowCount: 1 }); // Simulate property found
        } else if (query === queries.getEverythingAtOnceByPropertyId) {
          expect(params).toEqual([mockPropertyId, mockYear]); // Ensure parameters are as expected
          callback(null, mockResult); // Simulate successful database response
        }
      });
  
      const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getEverythingAtOnceByPropertyId(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.getEverythingAtOnceByPropertyId, [mockPropertyId, mockYear], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult.rows);
    });
  
    it('should return 404 when property does not exist', async () => {
      const mockPropertyId = 9999;
      const mockEmptyResult = { rowCount: 0 };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(null, mockEmptyResult); // Simulate property not found
      });
  
      const req = { params: { property_id: mockPropertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getEverythingAtOnceByPropertyId(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
  
    it('should return 500 when encountering internal server error', async () => {
      const mockPropertyId = 1;
      const mockYear = 2023;
  
      // Mocking pool.query to simulate internal server error
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockPropertyId]); // Ensure parameters are as expected
        callback(new Error('Mocked error'), null); // Simulate internal server error
      });
  
      const req = { params: { property_id: mockPropertyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getEverythingAtOnceByPropertyId(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfPropertyExists, [mockPropertyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
  describe('GET /everythingAtOnceByCompanyId/:companyid/:year', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mocks after each test
    });
  
    it('should return total condo fees collected, total operational costs for the year, and annual report for all properties when company exists and year is provided', async () => {
      const mockCompanyId = 1;
      const mockYear = 2023;
      const mockResult = {
        rows: [{ /* Mocked data */ }],
        rowCount: 1
      };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        if (query === queries.checkIfCompanyExists) {
          expect(params).toEqual([mockCompanyId]); // Ensure parameters are as expected
          callback(null, { rowCount: 1 }); // Simulate company found
        } else if (query === queries.getEverythingAtOnceByCompanyId) {
          expect(params).toEqual([mockCompanyId, mockYear]); // Ensure parameters are as expected
          callback(null, mockResult); // Simulate successful database response
        }
      });
  
      const req = { params: { companyid: mockCompanyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getEverythingAtOnceByCompanyId(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.getEverythingAtOnceByCompanyId, [mockCompanyId, mockYear], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult.rows);
    });
  
    it('should return 404 when company does not exist', async () => {
      const mockCompanyId = 9999;
      const mockEmptyResult = { rowCount: 0 };
  
      // Mocking pool.query to simulate the callback behavior
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockCompanyId]); // Ensure parameters are as expected
        callback(null, mockEmptyResult); // Simulate company not found
      });
  
      const req = { params: { companyid: mockCompanyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getEverythingAtOnceByCompanyId(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfCompanyExists, [mockCompanyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
  
    it('should return 500 when encountering internal server error', async () => {
      const mockCompanyId = 1;
      const mockYear = 2023;
  
      // Mocking pool.query to simulate internal server error
      pool.query.mockImplementation((query, params, callback) => {
        expect(params).toEqual([mockCompanyId]); // Ensure parameters are as expected
        callback(new Error('Mocked error'), null); // Simulate internal server error
      });
  
      const req = { params: { companyid: mockCompanyId.toString(), year: mockYear.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await getEverythingAtOnceByCompanyId(req, res);
  
      expect(pool.query).toHaveBeenCalledWith(queries.checkIfCompanyExists, [mockCompanyId], expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
  
  