// Import dependencies and mock pool.query
const { getAllReservations,
    getReservationsByUserId,
    getReservationsByDate,
    getReservationsByFacilityId,
    getReservationsByPropertyId,
    getReservationById,
    createReservation,
    deleteReservation,
    updateReservation } = require('../src/Reservation/controller');
const pool = require('../db');
jest.mock('../db', () => ({
  query: jest.fn(),
}));
const queries = require('../src/Reservation/queries')

describe('getAllReservations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all reservations when they exist', async () => {
    const mockReservations = [{ id: 1, name: 'Reservation 1' }, { id: 2, name: 'Reservation 2' }];
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the database query
    pool.query.mockImplementationOnce((query, callback) => {
      expect(query).toBe(queries.getAllReservations);
      callback(null, { rowCount: mockReservations.length, rows: mockReservations });
    });

    await getAllReservations(null, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReservations);
  });

  it('should return 404 if reservations are not found', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the database query
    pool.query.mockImplementationOnce((query, callback) => {
      expect(query).toBe(queries.getAllReservations);
      callback(null, { rowCount: 0 });
    });

    await getAllReservations(null, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Reservations not found' });
  });

  it('should return 500 if an internal server error occurs', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking an internal server error
    pool.query.mockImplementationOnce((query, callback) => {
      expect(query).toBe(queries.getAllReservations);
      callback(new Error('Internal Server Error'));
    });

    await getAllReservations(null, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getReservationsByUserId', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return reservations for the specified user ID when they exist', async () => {
      const userId = 1;
      const mockReservations = [{ id: 1, name: 'Reservation 1' }, { id: 2, name: 'Reservation 2' }];
      const req = { params: { userid: userId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByUserId);
        expect(params).toEqual([userId]);
        callback(null, { rowCount: mockReservations.length, rows: mockReservations });
      });
  
      await getReservationsByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReservations);
    });
  
    it('should return 404 if reservations are not found for the specified user ID', async () => {
      const userId = 1;
      const req = { params: { userid: userId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByUserId);
        expect(params).toEqual([userId]);
        callback(null, { rowCount: 0 });
      });
  
      await getReservationsByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reservations not found' });
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const userId = 1;
      const req = { params: { userid: userId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking an internal server error
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByUserId);
        expect(params).toEqual([userId]);
        callback(new Error('Internal Server Error'));
      });
  
      await getReservationsByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

describe('getReservationsByDate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return reservations for the specified date when they exist', async () => {
    const date = '2024-04-15';
    const mockReservations = [{ id: 1, name: 'Reservation 1' }, { id: 2, name: 'Reservation 2' }];
    const req = { params: { date: date } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the database query
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.getAllReservationsByDate);
      expect(params).toEqual([date]);
      callback(null, { rowCount: mockReservations.length, rows: mockReservations });
    });

    await getReservationsByDate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReservations);
  });

  it('should return 404 if reservations are not found for the specified date', async () => {
    const date = '2024-04-15';
    const req = { params: { date: date } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the database query
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.getAllReservationsByDate);
      expect(params).toEqual([date]);
      callback(null, { rowCount: 0 });
    });

    await getReservationsByDate(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Reservations not found' });
  });

  it('should return 500 if an internal server error occurs', async () => {
    const date = '2024-04-15';
    const req = { params: { date: date } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking an internal server error
    pool.query.mockImplementationOnce((query, params, callback) => {
      expect(query).toBe(queries.getAllReservationsByDate);
      expect(params).toEqual([date]);
      callback(new Error('Internal Server Error'));
    });

    await getReservationsByDate(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getReservationsByFacilityId', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return reservations for the specified facility ID when they exist', async () => {
      const facilityId = 1;
      const mockReservations = [{ id: 1, name: 'Reservation 1' }, { id: 2, name: 'Reservation 2' }];
      const req = { params: { facilityid: facilityId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByFacilityId);
        expect(params).toEqual([facilityId]);
        callback(null, { rowCount: mockReservations.length, rows: mockReservations });
      });
  
      await getReservationsByFacilityId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReservations);
    });
  
    it('should return 404 if reservations are not found for the specified facility ID', async () => {
      const facilityId = 1;
      const req = { params: { facilityid: facilityId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByFacilityId);
        expect(params).toEqual([facilityId]);
        callback(null, { rowCount: 0 });
      });
  
      await getReservationsByFacilityId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reservations not found' });
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const facilityId = 1;
      const req = { params: { facilityid: facilityId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking an internal server error
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByFacilityId);
        expect(params).toEqual([facilityId]);
        callback(new Error('Internal Server Error'));
      });
  
      await getReservationsByFacilityId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('getReservationsByPropertyId', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return reservations for the specified property ID when they exist', async () => {
      const propertyId = 1;
      const mockReservations = [{ id: 1, name: 'Reservation 1' }, { id: 2, name: 'Reservation 2' }];
      const req = { params: { propertyid: propertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByPropertyId);
        expect(params).toEqual([propertyId]);
        callback(null, { rowCount: mockReservations.length, rows: mockReservations });
      });
  
      await getReservationsByPropertyId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReservations);
    });
  
    it('should return 404 if reservations are not found for the specified property ID', async () => {
      const propertyId = 1;
      const req = { params: { propertyid: propertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByPropertyId);
        expect(params).toEqual([propertyId]);
        callback(null, { rowCount: 0 });
      });
  
      await getReservationsByPropertyId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reservations not found' });
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const propertyId = 1;
      const req = { params: { propertyid: propertyId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking an internal server error
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getAllReservationsByPropertyId);
        expect(params).toEqual([propertyId]);
        callback(new Error('Internal Server Error'));
      });
  
      await getReservationsByPropertyId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('getReservationById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return reservation details for the specified ID when it exists', async () => {
      const reservationId = 1;
      const mockReservation = { id: reservationId, name: 'Reservation 1' };
      const req = { params: { reservationid: reservationId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getReservationById);
        expect(params).toEqual([reservationId]);
        callback(null, { rowCount: 1, rows: [mockReservation] });
      });
  
      await getReservationById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReservation);
    });
  
    it('should return 404 if reservation is not found for the specified ID', async () => {
      const reservationId = 1;
      const req = { params: { reservationid: reservationId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getReservationById);
        expect(params).toEqual([reservationId]);
        callback(null, { rowCount: 0 });
      });
  
      await getReservationById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reservation not found' });
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const reservationId = 1;
      const req = { params: { reservationid: reservationId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking an internal server error
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.getReservationById);
        expect(params).toEqual([reservationId]);
        callback(new Error('Internal Server Error'));
      });
  
      await getReservationById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('createReservation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a reservation successfully', async () => {
      const req = { body: { user_id: 1, facility_id: 1, date: '2024-04-15' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query to check if the reservation exists
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.checkIfReservationExistsByDetails);
        expect(params).toEqual([req.body.facility_id, req.body.date]);
        // Simulating that the reservation does not exist
        callback(null, { rowCount: 0 });
      });
  
      // Mocking the database query to create the reservation
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.createReservation);
        expect(params).toEqual([req.body.user_id, req.body.facility_id, req.body.date]);
        callback(null, { rowCount: 1 });
      });
  
      await createReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation created successfully' });
    });
  
    it('should return 400 if reservation already exists for the specified facility and date', async () => {
      const req = { body: { user_id: 1, facility_id: 1, date: '2024-04-15' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query to check if the reservation exists
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.checkIfReservationExistsByDetails);
        expect(params).toEqual([req.body.facility_id, req.body.date]);
        // Simulating that the reservation already exists
        callback(null, { rowCount: 1 });
      });
  
      await createReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reservation already exists' });
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const req = { body: { user_id: 1, facility_id: 1, date: '2024-04-15' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query to check if the reservation exists
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.checkIfReservationExistsByDetails);
        expect(params).toEqual([req.body.facility_id, req.body.date]);
        // Simulating an internal server error
        callback(new Error('Internal Server Error'));
      });
  
      await createReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
  describe('deleteReservation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete a reservation successfully', async () => {
      const reservationId = 1;
      const req = { params: { reservationid: reservationId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query to delete the reservation
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.deleteReservation);
        expect(params).toEqual([reservationId]);
        callback(null, { rowCount: 1 });
      });
  
      await deleteReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation deleted successfully' });
    });
  
    it('should return 500 if an internal server error occurs', async () => {
      const reservationId = 1;
      const req = { params: { reservationid: reservationId.toString() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking an internal server error
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.deleteReservation);
        expect(params).toEqual([reservationId]);
        callback(new Error('Internal Server Error'));
      });
  
      await deleteReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('updateReservation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update a reservation successfully', async () => {
      const reservationId = 1;
      const req = {
        params: { reservationid: reservationId.toString() },
        body: { user_id: 1, facility_id: 1, date: '2024-04-15' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query to check if the reservation exists
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.checkIfReservationExists);
        expect(params).toEqual([reservationId]);
        // Simulating that the reservation exists
        callback(null, { rowCount: 1 });
      });
  
      // Mocking the database query to update the reservation
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.updateReservation);
        expect(params).toEqual([req.body.user_id, req.body.facility_id, req.body.date, reservationId]);
        callback(null, { rowCount: 1 });
      });
  
      await updateReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation updated successfully' });
    });
  
    it('should return 404 if reservation is not found', async () => {
        const reservationId = 1;
        const req = { params: { reservationid: reservationId.toString() }, body: {} }; // Passing an empty body object
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mocking the database query to check if the reservation exists
        pool.query.mockImplementationOnce((query, params, callback) => {
          expect(query).toBe(queries.checkIfReservationExists);
          expect(params).toEqual([reservationId]);
          // Simulating that the reservation does not exist
          callback(null, { rowCount: 0 });
        });
      
        await updateReservation(req, res);
      
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Reservation not found' });
      });
      
  
    it('should return 500 if an internal server error occurs', async () => {
      const reservationId = 1;
      const req = {
        params: { reservationid: reservationId.toString() },
        body: { user_id: 1, facility_id: 1, date: '2024-04-15' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the database query to check if the reservation exists
      pool.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe(queries.checkIfReservationExists);
        expect(params).toEqual([reservationId]);
        // Simulating an internal server error
        callback(new Error('Internal Server Error'));
      });
  
      await updateReservation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });