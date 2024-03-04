const pool = require("../db");
jest.mock("../db");
const { getCondoRenters } = require("../src/CondoRenter/controller");

describe("should get all condo renters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all condo renters", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockResults = [{ name: "John Doe", email: "john.doe@example.com" }];

    pool.query.mockImplementation((query, callback) => {
      callback(null, { rows: mockResults });
    });

    await getCondoRenters(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });

  afterAll(async () => {
    try {
      await pool.end();
    } catch (err) {
      console.error("Error closing the database connection:", err);
    }
  });
});
