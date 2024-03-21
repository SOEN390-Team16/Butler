const { getCondoUnits, getCondoUnitById, updateCondoUnit, calculateTotalCondoFee } = require("../src/CondoUnit/controller");
const pool = require("../db");
jest.mock("../db");


describe('CondoUnit Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCondoUnits', () => {
        it('should return all condo units', async () => {
            const mockData = [{ id: 1, condo_number: '101' }, { id: 2, condo_number: '102' }];
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            pool.query.mockImplementationOnce((query, callback) => {
                callback(null, { rows: mockData });
            });

            await getCondoUnits(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should handle internal server error', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            pool.query.mockImplementationOnce((query, callback) => {
                callback(new Error('Internal Server Error'));
            });

            await getCondoUnits(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('getCondoUnitById', () => {
        it('should return a specific condo unit', async () => {
            const mockResult = { id: 1, condo_number: '101' };
            const req = { params: { condoid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, { rows: [mockResult] });
            });

            await getCondoUnitById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle condo unit not found', async () => {
            const req = { params: { condoid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, { rows: [] });
            });

            await getCondoUnitById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Condo unit not found' });
        });

        it('should handle internal server error', async () => {
            const req = { params: { condoid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(new Error('Internal Server Error'));
            });

            await getCondoUnitById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('updateCondoUnit', () => {
        it('should update a condo unit successfully', async () => {
            const req = {
                params: { condoid: 1 },
                body: {
                    companyid: 1,
                    propertyid: 1,
                    condo_number: '101',
                    size: 1000,
                    occupant_type: 'Owner',
                    total_fees: 500,
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            
            const mockExistingResult = { rows: [{ /* mock existing condo unit data */ }] };
            const mockUpdateResult = { rowCount: 1 }; // Mock the result object to indicate successful update
            
            // Mocking the first query to check if condo unit exists
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, mockExistingResult);
            });
        
            // Mocking the second query to update the condo unit
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, mockUpdateResult);
            });
            
            await updateCondoUnit(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200); // Check if status is set to 200
            expect(res.json).toHaveBeenCalledWith({ message: 'Condo unit updated successfully' });
        });
                        
        it('should handle condo unit not found', async () => {
            const req = {
                params: { condoid: 1 },
                body: {
                    companyid: 1,
                    propertyid: 1,
                    condo_number: '101',
                    size: 1000,
                    occupant_type: 'Owner',
                    total_fees: 500,
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, { rows: [] });
            });
        
            await updateCondoUnit(req, res);
        
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Condo unit not found' });
        });
        
        it('should handle internal server error', async () => {
            const req = {
                params: { condoid: 1 },
                body: {
                    companyid: 1,
                    propertyid: 1,
                    condo_number: '101',
                    size: 1000,
                    occupant_type: 'Owner',
                    total_fees: 500,
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(new Error('Internal Server Error'));
            });
    
            await updateCondoUnit(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
        
    describe('calculateTotalCondoFee', () => {
        it('should calculate total condo fee successfully', async () => {
            const req = { params: { condoid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            const mockResult = { rows: [{ size: 1000, condo_fee_per_sqrft: 0.5 }] };
    
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, mockResult);
            });
    
            await calculateTotalCondoFee(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ totalCondoFee: 500 });
        });
    
        it('should handle condo unit not found', async () => {
            const req = { params: { condoid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(null, { rows: [] });
            });
    
            await calculateTotalCondoFee(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Condo unit not found' });
        });
    
        it('should handle internal server error', async () => {
            const req = { params: { condoid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            pool.query.mockImplementationOnce((query, values, callback) => {
                callback(new Error('Internal Server Error'));
            });
    
            await calculateTotalCondoFee(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });    
});  