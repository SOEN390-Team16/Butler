// const pool = require("../db");
// jest.mock("../db");
// const {
//   getPublicUsers,
//   getPublicUserById,
//   addPublicUser,
//   updatePublicUser,
//   removePublicUser,
// } = require("../src/PublicUser/controller");

// describe("getPublicUsers", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should get all public users successfully", async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const mockResults = [
//       { id: 1, name: "John Doe" },
//       { id: 2, name: "Jane Doe" },
//     ];

//     pool.query.mockImplementationOnce((query, callback) => {
//       callback(null, { rows: mockResults });
//     });

//     await getPublicUsers(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockResults);
//   });

//   it("should return 404 if no public users are found", async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, callback) => {
//       callback(null, { rowCount: 0, rows: [] });
//     });

//     await getPublicUsers(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: "Public Users not found" });
//   });

//   it("should return 500 if there is an internal server error", async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, callback) => {
//       callback(new Error("Internal Server Error"), null);
//     });

//     await getPublicUsers(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
// });

// describe("getPublicUserById", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should get a public user by id successfully", async () => {
//     const req = { params: { userid: "1" } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const mockResult = { id: 1, name: "John Doe" };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(null, { rows: [mockResult] });
//     });

//     await getPublicUserById(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith([mockResult]);
//   });

//   it("should return 404 if the public user is not found", async () => {
//     const req = { params: { userid: "999" } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(null, { rowCount: 0, rows: [] });
//     });

//     await getPublicUserById(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
//   });

//   it("should return 500 if there is an internal server error", async () => {
//     const req = { params: { userid: "1" } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(new Error("Internal Server Error"), null);
//     });

//     await getPublicUserById(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
// });

// describe("addPublicUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should add a public user successfully", async () => {
//     const req = {
//       body: {
//         first_name: "Jane",
//         last_name: "Doe",
//         email: "jane.doe@example.com",
//         password: "password123",
//         profile_picture: "profile.jpg",
//       },
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
//         callback(null, { rowCount: 1 }); // Public user added successfully
//       });

//     await addPublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.send).toHaveBeenCalledWith("Public User Created Successfully!");
//   });

//   it("should return 404 if email already exists", async () => {
//     const req = {
//       body: {
//         first_name: "John",
//         last_name: "Doe",
//         email: "existing.email@example.com",
//         password: "password123",
//         profile_picture: "profile.jpg",
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//       send: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(null, { rows: [{ email: "existing.email@example.com" }] }); // Email already exists
//     });

//     await addPublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.send).toHaveBeenCalledWith("Email Already Exists");
//   });

//   it("should return 500 if there is an internal server error", async () => {
//     const req = {
//       body: {
//         first_name: "Jane",
//         last_name: "Doe",
//         email: "jane.doe@example.com",
//         password: "password123",
//         profile_picture: "profile.jpg",
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(new Error("Internal Server Error"), null);
//     });

//     await addPublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
// });

// describe("updatePublicUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should update a public user successfully", async () => {
//     const req = {
//       params: { userid: "1" },
//       body: {
//         first_name: "Jane",
//         last_name: "Doe",
//         email: "jane.doe@example.com",
//         password: "newpassword123",
//         profile_picture: "newprofile.jpg",
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query
//       .mockImplementationOnce((query, values, callback) => {
//         callback(null, { rowCount: 1 }); // Public user found
//       })
//       .mockImplementationOnce((query, values, callback) => {
//         callback(null, { rowCount: 1 }); // Public user updated successfully
//       });

//     await updatePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Public User updated successfully",
//     });
//   });

//   it("should return 404 if public user is not found", async () => {
//     const req = {
//       params: { userid: "999" },
//       body: {
//         first_name: "Jane",
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(null, { rowCount: 0 }); // Public user not found
//     });

//     await updatePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: "Public User not found" });
//   });

//   it("should return 400 if no fields are provided for updating", async () => {
//     const req = {
//       params: { userid: "1" },
//       body: {},
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await updatePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error: "At least one field is required for updating",
//     });
//   });

//   it("should handle internal server error", async () => {
//     const req = {
//       params: { userid: "1" },
//       body: {
//         first_name: "Jane",
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(new Error("Internal Server Error"), null);
//     });

//     await updatePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
// });

// describe("removePublicUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should remove a public user successfully", async () => {
//     const req = {
//       params: { userid: "1" },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//       send: jest.fn(),
//     };

//     pool.query
//       .mockImplementationOnce((query, values, callback) => {
//         callback(null, { rows: [{ userid: 1 }] }); // Public user found
//       })
//       .mockImplementationOnce((query, values, callback) => {
//         callback(null, { rows: 0 }); // Public user removed successfully
//       });

//     await removePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.send).toHaveBeenCalledWith("user removed successfully.");
//   });

//   it("should return 404 if public user is not found", async () => {
//     const req = {
//       params: { userid: "999" },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(null, { rows: [] }); // Public user not found
//     });

//     await removePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
//   });

//   it("should handle internal server error", async () => {
//     const req = {
//       params: { userid: "1" },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     pool.query.mockImplementationOnce((query, values, callback) => {
//       callback(new Error("Internal Server Error"), null);
//     });

//     await removePublicUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
// });
