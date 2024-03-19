const pool = require("../db");
jest.mock("../db");

const {
  getCondoOwners,
  getCondoOwnerById,
  addCondoOwner,
  updateCondoOwner,
  removeCondoOwner,
} = require("../src/CondoOwner/controller");

describe("getCondoOwnerById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should get all condo owners successfully', async () => {
  //     const req = {};
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     const mockResults = {
  //       rows: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }],
  //     };

  //     pool.query.mockImplementationOnce((query, callback) => {
  //       callback(null, mockResults);
  //     });

  //     getCondoOwners(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith(mockResults.rows);
  // });

  // it('should return 404 if no condo owners are found', async () => {
  //     const req = {};
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     pool.query.mockImplementationOnce((query, callback) => {
  //       callback(null, { rows: [] });
  //     });

  //     getCondoOwners(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Condo Owners Not Found' });
  // });

  // it('should return 500 if there is an internal server error', async () => {
  //     const req = {};
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     pool.query.mockImplementationOnce((query, callback) => {
  //       callback(new Error('Internal Server Error'), null);
  //     });

  //     getCondoOwners(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  // });
  // it('should get a condo owner by id successfully', async () => {
  //     const req = {
  //       params: { ownerid: '1' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     const mockResults = {
  //       rows: [{ id: 1, name: 'John Doe' }],
  //     };

  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //       callback(null, mockResults);
  //     });

  //     getCondoOwnerById(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith(mockResults.rows);
  // });

  // it('should return 404 if the condo owner is not found', async () => {
  //     const req = {
  //       params: { ownerid: '2' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //       callback(null, { rows: [] });
  //     });

  //     getCondoOwnerById(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Condo Owner Not Found' });
  // });

  // it('should return 500 if there is an internal server error', async () => {
  //     const req = {
  //       params: { ownerid: '3' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //       callback(new Error('Internal Server Error'), null);
  //     });

  //     getCondoOwnerById(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  // });

  // it('should add a condo owner successfully', async () => {
  //     const req = {
  //       body: { email: 'newowner@example.com' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //       send: jest.fn(),
  //     };

  //     pool.query
  //       .mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rows: [] }); // Email does not exist
  //       })
  //       .mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rows: [{ "?column?": false }] }); // User does not exist
  //       })
  //       .mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rowCount: 1 }); // Condo owner added successfully
  //       });

  //     addCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(201);
  //     expect(res.send).toHaveBeenCalledWith('Condo Owner Created Successfully!');
  // });

  // it('should return 400 if email already exists', async () => {
  //     const req = {
  //       body: { email: 'existingowner@example.com' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //       callback(null, { rows: [{ "?column?": true }] }); // Email already exists
  //     });

  //     addCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
  // });

  // it('should return 500 if there is an internal server error', async () => {
  //     const req = {
  //       body: { email: 'newowner@example.com' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //       callback(new Error('Internal Server Error'), null);
  //     });

  //     addCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  // });
  // it('should update a condo owner successfully', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //         body: {
  //             first_name: 'John',
  //             last_name: 'Doe',
  //             email: 'john.doe@example.com',
  //             password: 'password123',
  //             profile_picture: 'profile.jpg',
  //         },
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //     };

  //     // Mocking pool.query for getCondoOwnerById
  //     const mockResults = {
  //         rows: [{ userid: 1 }],
  //     };
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, mockResults);
  //     });

  //     // Mocking pool.query for updateCondoOwner
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rowCount: 1 });
  //     });

  //     await updateCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ message: 'condo owner updated successfully' });
  // });

  // it('should return 404 if condo owner is not found', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //         body: {
  //             first_name: 'John',
  //             last_name: 'Doe',
  //             email: 'john.doe@example.com',
  //             password: 'password123',
  //             profile_picture: 'profile.jpg',
  //         },
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //     };

  //     // Mocking pool.query for getCondoOwnerById to return no results
  //     const mockResults = {
  //         rows: [],
  //     };
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, mockResults);
  //     });

  //     await updateCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Ccondo owner Not Found' });
  // });

  // it('should return 400 if no fields are provided for updating', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //         body: {},
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //     };

  //     await updateCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'At least one field is required for updating' });
  // });

  // it('should handle internal server error', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //         body: {
  //             first_name: 'John',
  //             last_name: 'Doe',
  //             email: 'john.doe@example.com',
  //             password: 'password123',
  //             profile_picture: 'profile.jpg',
  //         },
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //     };

  //     // Mocking pool.query for getCondoOwnerById to return an error
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(new Error('Internal Server Error'));
  //     });

  //     await updateCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  // });
  //     it('should remove a condo owner successfully', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //         send: jest.fn(),
  //     };

  //     // Mocking pool.query for getCondoOwnerById
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rows: [{ userid: 1 }] });
  //     });

  //     // Mocking pool.query for updateParentToPublicUser
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rowCount: 1 });
  //     });

  //     // Mocking pool.query for removeCondoOwner
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rowCount: 1 });
  //     });

  //     await removeCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.send).toHaveBeenCalledWith('condo owner removed successfully.');
  // });

  // it('should return 404 if condo owner is not found', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //     };

  //     // Mocking pool.query for getCondoOwnerById to return no results
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(null, { rows: [] });
  //     });

  //     await removeCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'condo owner not found' });
  // });

  // it('should handle internal server error when finding condo owner', async () => {
  //     const req = {
  //         params: { ownerid: '1' },
  //     };
  //     const res = {
  //         status: jest.fn().mockReturnThis(),
  //         json: jest.fn(),
  //     };

  //     // Mocking pool.query for getCondoOwnerById to return an error
  //     pool.query.mockImplementationOnce((query, values, callback) => {
  //         callback(new Error('Internal Server Error'));
  //     });

  //     await removeCondoOwner(req, res);

  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  // });
  it("should get condo owner by id", async () => {
    const req = { params: { ownerid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResults = [{ id: 1, name: "John Doe" }];

    // Mocking pool.query to return mockResults
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: mockResults });
    });

    await getCondoOwnerById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });

  it("should return 404 if condo owner not found", async () => {
    const req = { params: { ownerid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to return empty rows
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] });
    });

    await getCondoOwnerById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Condo Owner Not Found" });
  });

  it("should handle internal server error", async () => {
    const req = { params: { ownerid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to return an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"));
    });

    await getCondoOwnerById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should get all condo owners", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResults = [{ id: 1, name: "John Doe" }];

    // Mocking pool.query to return mockResults
    pool.query.mockImplementationOnce((query, callback) => {
      callback(null, { rows: mockResults });
    });

    await getCondoOwners(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });

  it("should return 404 if condo owners not found", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to return empty rows
    pool.query.mockImplementationOnce((query, callback) => {
      callback(null, { rows: [], rowCount: 0 });
    });

    await getCondoOwners(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Condo Owners Not Found" });
  });

  it("should handle internal server error", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to return an error
    pool.query.mockImplementationOnce((query, callback) => {
      callback(new Error("Internal Server Error"));
    });

    await getCondoOwners(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return 400 if email already exists", async () => {
    const req = {
      body: { email: "existing@example.com" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query for checkIfCREmailExists
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rows: [] }); // Email does not exist
    });

    await addCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email Doesn't Exists" });
  });

  it("should handle internal server error", async () => {
    const req = {
      body: { email: "test@example.com" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query to return an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"));
    });

    addCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should update a condo owner successfully", async () => {
    const req = {
      params: { ownerid: "1" },
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

    // Mocking pool.query for getCondoOwnerById
    const mockResults = {
      rows: [{ userid: 1 }],
    };
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, mockResults);
    });

    // Mocking pool.query for updateCondoOwner
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { rowCount: 1 });
    });

    await updateCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "condo owner updated successfully",
    });
  });

  it("should return 404 if condo owner is not found", async () => {
    const req = {
      params: { ownerid: "1" },
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

    // Mocking pool.query for getCondoOwnerById to return no results
    const mockResults = {
      rows: [],
    };
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, mockResults);
    });

    await updateCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Ccondo owner Not Found" });
  });

  it("should return 400 if no fields are provided for updating", async () => {
    const req = {
      params: { ownerid: "1" },
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "At least one field is required for updating",
    });
  });

  it("should handle internal server error", async () => {
    const req = {
      params: { ownerid: "1" },
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

    // Mocking pool.query for getCondoOwnerById to return an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"));
    });

    await updateCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should remove a condo owner successfully", async () => {
    const req = {
      params: { ownerid: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Mocking pool.query for getCondoOwnerById
    const mockResults = {
      rows: [{ userid: 1 }],
    };
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, mockResults);
    });

    // Mocking pool.query for removeCondoOwner
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, {});
    });

    await removeCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("condo owner removed successfully.");
  });

  it("should return 404 if condo owner is not found", async () => {
    const req = {
      params: { ownerid: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query for getCondoOwnerById to return no results
    const mockResults = {
      rows: [],
    };
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(null, mockResults);
    });

    await removeCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "condo owner not found" });
  });

  it("should handle internal server error", async () => {
    const req = {
      params: { ownerid: "1" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking pool.query for getCondoOwnerById to return an error
    pool.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error("Internal Server Error"));
    });

    await removeCondoOwner(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
