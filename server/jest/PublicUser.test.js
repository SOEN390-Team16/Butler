const pool = require("../db");
jest.mock("../db");
const {
  getPublicUsers,
  getPublicUserById,
  addPublicUser,
  removePublicUser,
  updatePublicUser,
} = require("../src/PublicUser/controller");

/*** GET ENDPOINT ***/
describe("Endpoint for Get Public Users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all public users successfully ", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResults = [{ name: "John Doe", email: "john.doe@example.com" }];

    pool.query.mockImplementation((query, callback) => {
      callback(null, { rows: mockResults });
    });

    await getPublicUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });

  it("should return 404 if no public users are found", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementation((query, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    await getPublicUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public Users not found" });
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

    await getPublicUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** GET BY ID ENDPOINT ***/
describe("Endpoint for Get Public User by ID", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get a specific public user successfully", async () => {
    const req = {
      params: { userid: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResult = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    };

    pool.query.mockImplementation((query, values, callback) => {
      callback(null, { rows: [mockResult] });
    });

    await getPublicUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockResult]);
  });

  it("should return 404 if the public user is not found", async () => {
    const req = {
      params: { userid: "999" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementation((query, values, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    await getPublicUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      params: { userid: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    pool.query.mockImplementation((query, values, callback) => {
      callback(mockError, null);
    });

    await getPublicUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** ADD ENDPOINT ***/
describe("Endpoint for Add Public User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a public user successfully", async () => {
    const req = {
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        password: "password123",
        profile_picture: "profile.jpg",
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
      callback(null, { rows: 1 });
    });

    await addPublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Public User Created Successfully!");
  });

  it("should return 404 if the email already exists", async () => {
    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        email: "test@gmail.com2",
        password: "password123",
        profile_picture: "profile.jpg",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ email: "test@gmail.com2" }] }); // Email exists
    });

    await addPublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Email Already Exists");
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        password: "password123",
        profile_picture: "profile.jpg",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Internal Server Error");

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError, null); // Error during email check
    });

    await addPublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** DELETE ENDPOINT ***/
describe("Endpoint for Remove Public User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove a public user successfully", async () => {
    const req = {
      params: { userid: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Mock the first query to simulate finding the user
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ id: 1 }] });
    });

    // Mock the second query to simulate successful removal
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("user removed successfully.");
  });

  it("should return 404 if the user is not found", async () => {
    const req = {
      params: { userid: "999" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate user not found
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] });
    });

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      params: { userid: "1" },
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

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** UPDATE ENDPOINT ***/
describe("Endpoint for Update Public User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a public user successfully", async () => {
    const req = {
      params: { userid: "1" },
      body: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        password: "password123",
        profile_picture: "profile.jpg",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate finding the user
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    // Mock the second query to simulate successful update
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Public User updated successfully",
    });
  });

  it("should return 400 if no fields are provided for updating", async () => {
    const req = {
      params: { userid: "1" },
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "At least one field is required for updating",
    });
  });

  it("should return 404 if the public user is not found", async () => {
    const req = {
      params: { userid: "999" },
      body: {
        first_name: "Jane",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the first query to simulate user not found
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 0 });
    });

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
  });

  it("should return 500 if there is an internal server error", async () => {
    const req = {
      params: { userid: "1" },
      body: {
        first_name: "Jane",
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

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
