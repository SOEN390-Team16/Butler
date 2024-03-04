const pool = require("../db");
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
    expect(res.json).toHaveBeenCalledWith([mockResult]);
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
describe("Endpoint for Add CMC", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a CMC successfully", async () => {
    const req = {
      body: {
        company_name: "New CMC",
        email: "newcmc@example.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Mock the first query to simulate no existing email
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] });
    });

    // Mock the second query to simulate successful insertion
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    await addCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(
      "Condo Management Company Created Successfully!"
    );
  });

  it("should return 500 if there is an error checking email existence", async () => {
    const req = {
      body: {
        company_name: "New CMC",
        email: "newcmc@example.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const mockError = new Error("Error checking email");

    // Mock the first query to simulate an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError, null);
    });

    await addCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      "An error occurred while checking email existence."
    );
  });

  it("should return 500 if there is an internal server error during insertion", async () => {
    const req = {
      body: {
        company_name: "New CMC",
        email: "newcmc@example.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate no existing email
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] });
    });

    const mockError = new Error("Internal Server Error");

    // Mock the second query to simulate an error during insertion
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError, null);
    });

    await addCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** UPDATE CMC ENDPOINT ***/
describe("Endpoint for Update CMC", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a CMC successfully", async () => {
    const req = {
      params: { companyID: "1" },
      body: {
        company_name: "Updated CMC",
        email: "updatedcmc@example.com",
        password: "newpassword123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate finding the CMC
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    // Mock the second query to simulate successful update
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "cmc user updated successfully",
    });
  });

  it("should return 400 if no fields are provided for updating", async () => {
    const req = {
      params: { companyID: "1" },
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "At least one field is required for updating",
    });
  });

  it("should return 404 if the CMC is not found", async () => {
    const req = {
      params: { companyID: "999" },
      body: {
        company_name: "Updated CMC",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate CMC not found
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 0 });
    });

    await updateCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "CMC User Not Found" });
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      params: { companyID: "1" },
      body: {
        company_name: "Updated CMC",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    // Mock the first query to simulate an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError, null);
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
      callback(null, { rowCount: 1 });
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

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      params: { companyID: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    // Mock the first query to simulate an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError, null);
    });

    await removeCMC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
