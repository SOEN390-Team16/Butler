const pool = require("../db");
const mockDb = require("mock-knex");
mockDb.mock(pool);
jest.mock("../db");

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

const {
  getPublicUsers,
  getPublicUserById,
  addPublicUser,
  updatePublicUser,
  removePublicUser,
} = require("../src/PublicUser/controller");


/*** GET PUBLIC USERS ***/
describe("getPublicUsers", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should return all public users on success", async () => {
    const mockPublicUsers = [
      {
        userid: 1,
        first_name: "user1",
        last_name: "idk",
        email: "g@gmail.com",
        password: "123",
        role: "public",
        profile_pictue: "yow",
      },
      {
        userid: 1,
        first_name: "user2",
        last_name: "idk2",
        email: "c@gmail.com",
        password: "1234",
        role: "public",
        profile_pictue: "yow",
      },
    ];
    pool.query.mockImplementation((query, callback) => {
      callback(null, { rowCount: 2, rows: mockPublicUsers });
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPublicUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPublicUsers);
  });

  it("should return a 404 error if no public users are found", async () => {
    pool.query.mockImplementation((query, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPublicUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public Users not found" });
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query, callback) => {
      callback(new Error("Internal Server Error"), null);
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPublicUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** GET PUBLIC USER BY ID ***/
describe("getPublicUserById", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should return a public user by ID on success", async () => {
    const mockPublicUser = {
      userid: 1,
      first_name: "user1",
      last_name: "idk",
      email: "g@gmail.com",
      password: "123",
      role: "public",
      profile_pictue: "yow",
    };
    pool.query.mockImplementation((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [mockPublicUser] });
    });

    const req = { params: { userid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPublicUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockPublicUser]);
  });

  it("should return a 404 error if public user is not found", async () => {
    pool.query.mockImplementation((query, params, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    const req = { params: { userid: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPublicUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query, params, callback) => {
      callback(new Error("Internal Server Error"), null);
    });

    const req = { params: { userid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getPublicUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** ADD PUBLIC USER ***/
describe("addPublicUser", () => {
  let req, res;

  beforeEach(() => {
    pool.query.mockClear();
    req = {

      body: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        profile_picture: "profile.jpg",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should add a public user successfully", async () => {
    pool.query
      .mockImplementationOnce((query, params, callback) => {
        callback(null, { rows: [] })
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: [{ id: 1, ...req.body }] }) // generateRegistrationKey
      })

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        profile_picture: "profile.jpg",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const expectedJson = [{
      email: 'john.doe@example.com',
      first_name: 'John',
      id: 1,
      last_name: 'Doe',
      password: 'password123',
      profile_picture: 'profile.jpg'
    }]

    await addPublicUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expectedJson);
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Server error'), null)
    })

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addPublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** REMOVE PUBLIC USER ***/
describe("removePublicUser", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should remove a public user successfully", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rows: [{ userid: 1 }] }); // Mock user exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, {}); // Mock removePublicUser
    });

    const req = { params: { userid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("user removed successfully.");
  });

  it("should return a 404 error if public user is not found", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rows: [] }); // Mock user does not exist
    });

    const req = { params: { userid: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return a 500 error on server error when finding user", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Server error"), null); // Simulate server error
    });

    const req = { params: { userid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return a 500 error on database error when removing user", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rows: [{ userid: 1 }] }); // Mock user exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Server error"), null); // Simulate database error
    });

    const req = { params: { userid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** UPDATE PUBLIC USER ***/
describe("updatePublicUser", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should update a public user successfully", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [{ userid: 1 }] }); // Mock user exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1 }); // Mock updatePublicUser
    });

    const req = {
      params: { userid: "1" },
      body: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "newpassword123",
        role: "public",
        profile_picture: "new_profile.jpg",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Public User updated successfully",
    });
  });

  it("should return a 400 error if no fields are provided for updating", async () => {
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

  it("should return a 404 error if public user is not found", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 0, rows: [] }); // Mock user does not exist
    });

    const req = {
      params: { userid: "999" },
      body: {
        first_name: "John",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
  });

  it("should return a 500 error on database error when updating public user", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [{ userid: 1 }] }); // Mock user exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Database error"), null); // Simulate database error
    });

    const req = {
      params: { userid: "1" },
      body: {
        first_name: "John",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updatePublicUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
