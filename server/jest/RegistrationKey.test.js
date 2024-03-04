const {
  generateRegistrationKey,
  getRegistrationKeyByEmail,
  revokeRegistrationKeyByEmailAndCondoId,
  generateRandomKey,
} = require("../src/RegistrationKey/controller");
const pool = require("../db");

jest.mock("../db");

describe("generateRegistrationKey", () => {
  it("should generate a new registration key and assign it to a user", async () => {
    const req = {
      body: { email: "test@example.com", role: "owner" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const registration_key = "randomKey";
    generateRandomKey.mockReturnValue(registration_key);

    pool.query
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: [] }); // checkIfRegistrationKeyAlreadyExists
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 1 }); // checkIfPublicUserExists
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 1 }); // generateRegistrationKey
      });

    await generateRegistrationKey(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(
      "new registration key assigned to user"
    );
  });

  it("should return 404 if the registration key already exists", async () => {
    const req = {
      body: { email: "test@example.com", role: "owner" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const registration_key = "randomKey";
    generateRandomKey.mockReturnValue(registration_key);

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [{ registration_key }] }); // checkIfRegistrationKeyAlreadyExists
    });

    await generateRegistrationKey(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Registration Key Already Exists");
  });

  it("should return 404 if the public user is not found", async () => {
    const req = {
      body: { email: "test@example.com", role: "owner" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const registration_key = "randomKey";
    generateRandomKey.mockReturnValue(registration_key);

    pool.query
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: [] }); // checkIfRegistrationKeyAlreadyExists
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 0 }); // checkIfPublicUserExists
      });

    await generateRegistrationKey(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
  });

  it("should handle internal server error when checking if registration key exists", async () => {
    const req = {
      body: { email: "test@example.com", role: "owner" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const registration_key = "randomKey";
    generateRandomKey.mockReturnValue(registration_key);

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"), null); // checkIfRegistrationKeyAlreadyExists
    });

    await generateRegistrationKey(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
  it("should return the registration key for a given email", async () => {
    const req = {
      params: { email: "test@example.com" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResults = {
      rows: [{ registration_key: "key123" }],
      rowCount: 1,
    };

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, mockResults);
    });

    await getRegistrationKeyByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults.rows);
  });

  it("should return 404 if the registration key is not found", async () => {
    const req = {
      params: { email: "test@example.com" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 0 });
    });

    await getRegistrationKeyByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Registration Key Not Found",
    });
  });

  it("should handle internal server error when getting registration key", async () => {
    const req = {
      params: { email: "test@example.com" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"), null);
    });

    await getRegistrationKeyByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Sever Error" });
  });
  it("should revoke the registration key for a given email and condoID", async () => {
    const req = {
      body: { email: "test@example.com", condoID: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    pool.query
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rows: [{ exists: true }], rowCount: 1 }); // checkIfUserHasActiveRegistrationKey
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 1 }); // updateRoleBeforeRevoking
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { rowCount: 1 }); // revokeRegistrationKey
      });

    await revokeRegistrationKeyByEmailAndCondoId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Key Revoked Successfully");
  });

  it("should return 404 if user is not found", async () => {
    const req = {
      body: { email: "test@example.com", condoID: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [], rowCount: 0 }); // checkIfUserHasActiveRegistrationKey
    });

    await revokeRegistrationKeyByEmailAndCondoId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});
