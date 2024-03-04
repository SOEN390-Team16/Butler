const { response } = require('express');
const pool = require('../db');
jest.mock('../db');

const {
    getProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    removeProperty,
} = require('../src/Property/controller');

describe('Property functionality', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all properties successfully', async () => {
        // Mocking pool.query to return mock data
        const mockData = [{ id: 1, name: 'Property 1' }, { id: 2, name: 'Property 2' }];
        pool.query.mockImplementationOnce((query, callback) => {
            callback(null, { rows: mockData });
        });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getProperties(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle internal server error while getting all properties', async () => {
        // Mocking pool.query to return an error
        pool.query.mockImplementationOnce((query, callback) => {
            callback(new Error('Internal Server Error'));
        });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getProperties(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should get a specific property by its ID', async () => {
        // Mocking pool.query to return mock data
        const mockResult = { id: 5, name: 'Test Property' };
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [mockResult] });
        });

        const req = { params: { property_id: 5 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPropertyById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 404 if property not found', async () => {
        // Mocking pool.query to return no rows
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [] });
        });

        const req = { params: { property_id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPropertyById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });

    it('should handle internal server error while getting a property by ID', async () => {
        // Mocking pool.query to return an error
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(new Error('Internal Server Error'));
        });

        const req = { params: { property_id: 5 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPropertyById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    /*it('should add a new property successfully', async () => {
        // Mocking pool.query to simulate successful addition
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rowCount: 1 });
        });

        const req = {
            body: {
                companyid: 11,
                property_name: 'New Property',
                unit_count: 10,
                parking_count: 5,
                locker_count: 2,
                address: '123 Main St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await addProperty(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Property profile successfully added." });
    });*/

    it('should return 400 if property name already exists', async () => {
        // Mocking pool.query to simulate existing property name
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rowCount: 1 });
        });

        const req = {
            body: {
                companyid: 1,
                property_name: 'Existing Property',
                unit_count: 10,
                parking_count: 5,
                locker_count: 2,
                address: '123 Main St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await addProperty(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Property name already exists' });
    });

    it('should return 404 if company does not exist', async () => {
        // Mocking pool.query to simulate company not found
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rows: [] });
        });

        const req = {
            body: {
                companyid: 99, // Assuming company ID 99 does not exist
                property_name: 'New Property',
                unit_count: 10,
                parking_count: 5,
                locker_count: 2,
                address: '123 Main St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await addProperty(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Company does not exist");
    });

    it('should update an existing property successfully', async () => {
        // Mocking pool.query to simulate successful update
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rowCount: 1, rows: [{ id: 1 }] }); // Provide a mock result with the expected structure
        });
    
        const req = {
            params: { property_id: 1 },
            body: {
                property_name: 'Updated Property',
                unit_count: 20,
                parking_count: 10,
                locker_count: 6,
                address: '456 Oak St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await updateProperty(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Property profile successfully updated" });
    });

    it('should return 404 if property to update is not found', async () => {
        // Mocking pool.query to simulate property not found
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [] });
        });

        const req = {
            params: { property_id: 99 }, // Assuming property ID 99 does not exist
            body: {
                property_name: 'Updated Property',
                unit_count: 20,
                parking_count: 10,
                locker_count: 6,
                address: '456 Oak St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateProperty(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Property profile not found' });
    });

    it('should remove an existing property successfully', async () => {
        // Mocking pool.query to simulate successful removal
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rowCount: 1, rows: [{ id: 1 }] }); // Provide a mock result with the expected structure
        });
    
        const req = {
            params: { property_id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await removeProperty(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Property profile successfully removed." });
    });
    
    it('should return 404 if property to remove is not found', async () => {
        // Mocking pool.query to simulate property not found
        pool.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [] });
        });

        const req = {
            params: { property_id: "995" }, 
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await removeProperty(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Property not found' });
    });
});