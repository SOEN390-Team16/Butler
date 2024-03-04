const pool = require('../db');
jest.mock('../db');

const {
    getCondoRenters,
    getCondoRenterById,
    addCondoRenter,
    updateCondoRenter,
    removeCondoRenter,
  } = require('../src/CondoRenter/controller');
  
describe('getCondoRenterById', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
    it('should get condo renter by id', async () => {
        const req = { params: { renterid: '1' } };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        const mockResults = [{ id: 1, name: 'John Doe' }];

        // Mocking pool.query to return mockResults
        pool.query.mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: mockResults });
        });

        await getCondoRenterById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    it('should return 404 if condo renter not found', async () => {
        const req = { params: { renterid: '1' } };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mocking pool.query to return empty rows
        pool.query.mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: [] });
        });

        await getCondoRenterById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Condo Renter Not Found' });
    });

    it('should handle internal server error', async () => {
        const req = { params: { renterid: '1' } };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mocking pool.query to return an error
        pool.query.mockImplementationOnce((query, values, callback) => {
        callback(new Error('Internal Server Error'));
        });

        await getCondoRenterById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });


    it('should get all condo renters', async () => {
        const req = {};
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        const mockResults = [{ id: 1, name: 'John Doe' }];

        // Mocking pool.query to return mockResults
        pool.query.mockImplementationOnce((query, callback) => {
        callback(null, { rows: mockResults });
        });

        await getCondoRenters(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    it('should return 404 if condo renters not found', async () => {
        const req = {};
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mocking pool.query to return empty rows
        pool.query.mockImplementationOnce((query, callback) => {
        callback(null, { rows: [], rowCount: 0 });
        });

        await getCondoRenters(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'condo renters not found' });
    });

    it('should handle internal server error', async () => {
        const req = {};
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mocking pool.query to return an error
        pool.query.mockImplementationOnce((query, callback) => {
        callback(new Error('Internal Server Error'));
        });

        await getCondoRenters(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    // it.only('should add a condo renter successfully', async () => {
    //     const req = {
    //       body: { email: 'testCey@email.com' },
    //     };
    //     const res = {
    //       status: jest.fn().mockReturnThis(),
    //       json: jest.fn(),
    //       send: jest.fn(),
    //     };
      
    //     // Mocking pool.query for checkIfCREmailExists
    //     pool.query.mockImplementationOnce((query, values, callback) => {
    //       callback(null, { rows: [] }); // Email does not exist
    //     });
      
    //     // Mocking pool.query for checkIfUserAlreadyExists
    //     pool.query.mockImplementationOnce((query, values, callback) => {
    //       callback(null, { rows: [{ "?column?": false }] }); // User does not exist
    //     });
      
    //     // Mocking pool.query for addCondoRenter
    //     pool.query.mockImplementationOnce((query, values, callback) => {
    //       callback(null, { rowCount: 1 }); // Condo renter added successfully
    //     });
      
    //     await addCondoRenter(req, res);
    //     console.log(res.status)
    //     expect(res.status).toHaveBeenCalledWith(201);
    //     expect(res.send).toHaveBeenCalledWith('Condo Renter Created Successfully!');
    // });
      
    
    it('should return 400 if email already exists', async () => {
        const req = {
            body: { email: 'existing@example.com' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        // Mocking pool.query for checkIfCREmailExists
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [] }); // Email does not exist
        });
        
        await addCondoRenter(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email Doesn\'t Exists' });
    });

    it('should handle internal server error', async () => {
        const req = {
        body: { email: 'test@example.com' },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        // Mocking pool.query to return an error
        pool.query.mockImplementationOnce((query, values, callback) => {
        callback(new Error('Internal Server Error'));
        });

        addCondoRenter(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should update a condo renter successfully', async () => {
        const req = {
            params: { renterid: '1' },
            body: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            profile_picture: 'profile.jpg',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking pool.query for getCondoRenterById
        const mockResults = {
            rows: [{ userid: 1 }],
        };
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, mockResults);
        });

        // Mocking pool.query for updateCondoRenter
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rowCount: 1 });
        });

        await updateCondoRenter(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'condo renter updated successfully' });
    });

    it('should return 404 if condo renter is not found', async () => {
        const req = {
            params: { renterid: '1' },
            body: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            profile_picture: 'profile.jpg',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking pool.query for getCondoRenterById to return no results
        const mockResults = {
            rows: [],
        };
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, mockResults);
        });

        await updateCondoRenter(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ccondo renter Not Found' });
    });

    it('should return 400 if no fields are provided for updating', async () => {
        const req = {
            params: { renterid: '1' },
            body: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateCondoRenter(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'At least one field is required for updating' });
    });

    it('should handle internal server error', async () => {
        const req = {
            params: { renterid: '1' },
            body: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            profile_picture: 'profile.jpg',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mocking pool.query for getCondoRenterById to return an error
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error('Internal Server Error'));
        });

        await updateCondoRenter(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  
    it('should remove a condo renter successfully', async () => {
      const req = {
        params: { renterid: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Mocking pool.query for getCondoRenterById
      const mockResults = {
        rows: [{ userid: 1 }],
      };
      pool.query.mockImplementationOnce((query, values, callback) => {
        callback(null, mockResults);
      });
  
      // Mocking pool.query for updateParentToPublicUser
      pool.query.mockImplementationOnce((query, values, callback) => {
        callback(null, {});
      });
  
      // Mocking pool.query for removeCondoRenter
      pool.query.mockImplementationOnce((query, values, callback) => {
        callback(null, {});
      });
  
      await removeCondoRenter(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('condo renter removed successfully.');
    });
  
    it('should return 404 if condo renter is not found', async () => {
      const req = {
        params: { renterid: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking pool.query for getCondoRenterById to return no results
      const mockResults = {
        rows: [],
      };
      pool.query.mockImplementationOnce((query, values, callback) => {
        callback(null, mockResults);
      });
  
      await removeCondoRenter(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'condo renter not found' });
    });
  
    it('should handle internal server error', async () => {
      const req = {
        params: { renterid: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking pool.query for getCondoRenterById to return an error
      pool.query.mockImplementationOnce((query, values, callback) => {
        callback(new Error('Internal Server Error'));
      });
  
      await removeCondoRenter(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
