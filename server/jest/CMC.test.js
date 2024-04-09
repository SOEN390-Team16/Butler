const pool = require("../db");
const mockDb = require("mock-knex");
mockDb.mock(pool);
jest.mock("../db");

const {
  getCMCs,
  getCMCById,
  addCMC,
  removeCMC,
  updateCMC,
} = require("../src/CMC/controller");

/*** GET ALL CMCs ENDPOINT ***/
describe("Endpoint for Get All CMCs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all CMCs successfully", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResults = [
      { company_name: "CMC1", email: "cmc1@example.com" },
      { company_name: "CMC2", email: "cmc2@example.com" },
    ];

    pool.query.mockImplementation((query, callback) => {
      callback(null, { rows: mockResults });
    });

    await getCMCs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });

  it("should return 404 if no CMCs are found", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementation((query, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    await getCMCs(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "CMC User Not Found" });
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    pool.query.mockImplementation((query, callback) => {
      callback(mockError, null);
    });

    await getCMCs(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** GET CMC BY ID ENDPOINT ***/
describe("Endpoint for Get CMC by ID", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get a specific CMC successfully", async () => {
    const req = {
      params: { companyID: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResult = {
      company_name: "CMC1",
      email: "cmc1@example.com",
    };

    pool.query.mockImplementation((query, values, callback) => {
      callback(null, { rows: [mockResult] });
    });

    await getCMCById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return 404 if the CMC is not found", async () => {
    const req = {
      params: { companyID: "999" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementation((query, values, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    await getCMCById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "CMC User Not Found" });
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      params: { companyID: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    pool.query.mockImplementation((query, values, callback) => {
      callback(mockError, null);
    });

    await getCMCById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** ADD CMC ENDPOINT ***/
describe("addCMC", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        company_name: "Test Company",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  // it("should return 400 if email already exists", async () => {
  //   // Mocking pool.query for checkIfCMCEmailExists
  //   pool.query.mockImplementationOnce((query, values, callback) => {
  //     callback(null, { rows: [{ id: 1 }] }); // Email exists
  //   });

  //   await addCMC(req, res);

  //   expect(res.status).toHaveBeenCalledWith(400); // Adjusted to 400 to match your convention
  //   expect(res.send).toHaveBeenCalledWith("Email Already Exists");
  // });

  it("should handle internal server error during email existence check", async () => {
    // Mocking pool.query to return an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"));
    });

    await addCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      "An error occurred while checking email existence."
    );
  });
});

/*** UPDATE CMC ENDPOINT ***/
describe("updateCMC", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { companyID: "1" },
      body: {
        company_name: "Updated Company",
        email: "updated@example.com",
        password: "updatedPassword",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should update a CMC user successfully", async () => {
    // Mocking pool.query for getCMCById
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ companyID: 1 }] });
    });

    // Mocking pool.query for updateCMC
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "cmc user updated successfully",
    });
  });

  it("should return 404 if CMC user is not found", async () => {
    // Mocking pool.query for getCMCById to return no results
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] });
    });

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "CMC User Not Found" });
  });

  it("should return 400 if no fields are provided for updating", async () => {
    req.body = {};

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "At least one field is required for updating",
    });
  });

  it("should handle internal server error during cmc user update", async () => {
    // Mocking pool.query for getCMCById
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ companyID: 1 }] });
    });

    // Mocking pool.query for updateCMC to return an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"));
    });

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** DELETE CMC ENDPOINT ***/
describe("Endpoint for Remove CMC", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove a CMC successfully", async () => {
    const req = {
      params: { companyID: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Mock the first query to simulate finding the CMC
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ companyID: 1 }] });
    });

    // Mock the second query to simulate successful removal
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    await removeCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("cmc user removed successfully.");
  });

  it("should return 404 if the CMC is not found", async () => {
    const req = {
      params: { companyID: "999" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate CMC not found
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] });
    });

    await removeCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "cmc user not found" });
  });

  it("should return 500 if there is an internal server error while finding the CMC", async () => {
    const req = {
      params: { companyID: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    // Mock the first query to simulate an error while finding the CMC
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError, null);
    });

    await removeCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return 500 if there is an internal server error while removing the CMC", async () => {
    const req = {
      params: { companyID: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate finding the CMC
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ companyID: 1 }] });
    });

    // Mock the second query to simulate an error while removing the CMC
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"), null);
    });

    await removeCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
