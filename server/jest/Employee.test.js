const pool = require("../db");

const {
  getEmployees,
  getEmployeeByID,
  addEmployee,
  removeEmployee,
  updateEmployee,
} = require("../src/Employee/controller");

// Mock the pool.query function
jest.mock("../db", () => ({
  query: jest.fn(),
}));

/* GET EMPLOYEES */
describe("getEmployees", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should return all employees on success", async () => {
    const mockEmployees = [
      {
        employeeid: 1,
        first_name: "John",
        last_name: "Doe",
        companyid: 1,
        role: "employee",
        property_id: 1,
      },
      {
        employeeid: 2,
        first_name: "PNL",
        last_name: "Mowgli",
        companyid: 1,
        role: "employee",
        property_id: 1,
      },
    ];
    pool.query.mockImplementation((query,params, callback) => {
      callback(null, { rowCount: 1, rows: mockEmployees });
    });

    const req = { params: { company_id: '1'}};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getEmployees(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query,params, callback) => {
      callback(new Error("Internal Server Error"), null);
    });

    const req = { params: { company_id: 'hello'}};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getEmployees(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** GET EMPLOYEE BY ID ***/
describe("getEmployeeByID", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should return an employee by ID on success", async () => {
    const mockEmployee = {
      employeeid: 2,
      first_name: "PNL",
      last_name: "Mowgli",
      comapnyid: 1,
      role: "employee",
      property_id: 1,
    };
    pool.query.mockImplementation((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [mockEmployee] });
    });

    const req = { params: { empid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getEmployeeByID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockEmployee]);
  });

  it("should return a 404 error if employee is not found", async () => {
    pool.query.mockImplementation((query, params, callback) => {
      callback(null, { rowCount: 0, rows: [] });
    });

    const req = { params: { empid: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getEmployeeByID(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Employee not found" });
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query, params, callback) => {
      callback(new Error("Server error"), null);
    });

    const req = { params: { empid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getEmployeeByID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** ADD EMPLOYEE ***/
describe("addEmployee", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should add an employee successfully", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Mock company exists
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Mock property exists
    pool.query.mockResolvedValueOnce({}); // Mock addEmployee

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        companyid: 1,
        role: "employee",
        property_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Employee Created Successfully!",
      employee: req.body,
    });
  });

  it("should return a 404 error if company ID does not exist", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }); // Mock company does not exist

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        companyid: 999,
        role: "Developer",
        property_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await addEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Company ID does not exist");
  });

  it("should return a 404 error if property ID does not exist", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Mock company exists
    pool.query.mockResolvedValueOnce({ rows: [] }); // Mock property does not exist

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        companyid: 1,
        role: "Developer",
        property_id: 999,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await addEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Property ID does not exist");
  });

  it("should return a 500 error on server error", async () => {
    pool.query.mockImplementation((query, callback) => {
      callback(new Error("Server error"), null);
    });

    const req = {
      body: {
        first_name: "John",
        last_name: "Doe",
        companyid: 1,
        role: "employee",
        property_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** REMOVE EMPLOYEE BY ID ***/
describe("removeEmployee", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should remove an employee successfully", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rows: [{ id: 1 }] }); // Mock employee exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, {}); // Mock removeEmployee
    });

    const req = { params: { empid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await removeEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Employee removed successfully.");
  });

  it("should return a 404 error if employee is not found", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rows: [] }); // Mock employee does not exist
    });

    const req = { params: { empid: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Employee not found" });
  });

  it("should return a 500 error on server error when finding user", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Server error"), null); // Simulate server error
    });

    const req = { params: { empid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return a 500 error on database error when removing user", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rows: [{ id: 1 }] }); // Mock employee exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Server error"), null); // Simulate database error
    });

    const req = { params: { empid: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await removeEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

/*** UPDATE EMPLOYEE ***/
describe("updateEmployee", () => {
  beforeEach(() => {
    // Clear mock data before each test
    pool.query.mockClear();
  });

  it("should update an employee successfully", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [{ id: 1 }] }); // Mock employee exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1 }); // Mock updateEmployee
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [{ id: 1 }] }); // Mock getEmployeeByID
    });

    const req = {
      params: { empid: "1" },
      body: {
        first_name: "John",
        last_name: "Doe",
        companyid: 1,
        role: "Developer",
        property_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Employee Updated Successfully!",
      employee: [{ id: 1 }],
    });
  });

  //   it("should return a 400 error if no fields are provided for updating", async () => {
  //     const req = {
  //       params: { empid: "1" },
  //       body: {},
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     await updateEmployee(req, res);

  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.json).toHaveBeenCalledWith({
  //       error: "At least one field is required for updating",
  //     });
  //   });

  it("should return a 404 error if employee is not found", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 0, rows: [] }); // Mock employee does not exist
    });

    const req = {
      params: { empid: "999" },
      body: {
        first_name: "John",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Employee not found" });
  });

  it("should return a 500 error on database error when updating employee", async () => {
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { rowCount: 1, rows: [{ id: 1 }] }); // Mock employee exists
    });
    pool.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Database error"), null); // Simulate database error
    });

    const req = {
      params: { empid: "1" },
      body: {
        first_name: "John",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
