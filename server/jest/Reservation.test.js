const pool = require("../db");
const {
  getAllReservations,
  getReservationById,
  createReservation
} = require("../src/Reservation/controller");

// Mock the pool.query function
jest.mock("../db", () => ({
  query: jest.fn(),
}));

/*** GET ALL RESERVATIONS ***/
describe("getAllReservations", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should return all reservations on success", async () => {
    const mockReservations = [
      { id: 1, userid: 1, date: "2024-04-12" },
      { id: 2, userid: 2, date: "2024-04-15" }
    ];
    pool.query.mockImplementation((query, callback) => {
      callback(null, { rowCount: 2, rows: mockReservations });
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    getAllReservations(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReservations);
  });

  it("should return a 200 status with empty array if no reservations are found", async () => {
    pool.query.mockImplementation((query, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    getAllReservations(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query, callback) => {
      callback(new Error("Internal Server Error"), null);
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllReservations(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

/*** GET RESERVATION BY ID ***/

  it("should return a reservation by ID on success", async () => {
    const mockReservation = { id: 1, userid: 1, date: "2024-04-12" };
    pool.query.mockImplementation((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [mockReservation] });
    });

    const req = { params: { reservationid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    getReservationById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReservation);
  });

  it("should return a 404 error if reservation is not found", async () => {
    pool.query.mockImplementation((query, params, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    const req = { params: { reservationid: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    getReservationById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Reservation not found" });
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query, params, callback) => {
      callback(new Error("Server error"), null);
    });

    const req = { params: { reservationid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    getReservationById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

/*** CREATE RESERVATION ***/

// it("should create a reservation successfully", async () => {
//   pool.query.mockResolvedValueOnce({ rowCount: 0 });  // Simulate no existing reservation
//   pool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1, userid: 1, date: "2024-04-12" }] });  // Simulate successful creation

//   const req = {
//     body: { userid: 1, facilityid: 1, date: "2024-04-12" }
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn()
//   };

//   await createReservation(req, res);

//   expect(res.status).toHaveBeenCalledWith(201);
//   expect(res.json).toHaveBeenCalledWith({ message: "Reservation created successfully" });
// });


//   it("should return a 400 error if reservation already exists", async () => {
//     pool.query.mockResolvedValueOnce({ rowCount: 1 }); // Existing reservation found

//     const req = {
//       body: { userid: 1, facilityid: 1, date: "2024-04-12" }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     createReservation(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({ error: "Reservation already exists" });
//   });

//   it("should return a 500 error on server error", async () => {
//     pool.query.mockImplementationOnce((query, callback) => {
//       callback(new Error("Server error"), null);
//     });

//     const req = {
//       body:{
//         userid: 1, facilityid: 1, date: "2024-04-12" 
//       }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     createReservation(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
});
