const pool = require("../../db");
const queries = require("./queries");

const getPublicUsers = (req, res) => {
  console.log("Get All Public Users");
  pool.query(queries.getPublicUsers, (error, results) => {
    if (error) return res.json(error);
    res.status(200).json(results.rows);
  });
};

const getPublicUserById = (req, res) => {
  console.log("Getting Public User With ID:");
  console.log(req.params.userid);
  const userid = parseInt(req.params.userid);
  pool.query(queries.getPublicUserById, [userid], (error, results) => {
    if (results.rows.length == 0) res.send("No Public User found.");
    else res.status(200).json(results.rows);
  });
};

const addPublicUser = (req, res) => {
  console.log("Adding Public User");
  const {
    userid,
    first_name,
    last_name,
    email,
    password,
    role,
    profile_picture,
  } = req.body;
  pool.query(queries.checkIfEmailExists, [email], (error, results) => {
    if (error) {
      console.error("Error checking if email exists:", error);
      return res
        .status(500)
        .send("An error occurred while checking email existence.");
    }
    if (results.rows.length) {
      res.send("Email Already Exists, Public User Not Created.");
    } else {
      pool.query(
        queries.addPublicUser,
        [userid, first_name, last_name, email, password, role, profile_picture],
        (error, result) => {
          if (error) return res.json(error);
          res.status(201).send("Public User Created Successfully!");
        }
      );
    }
  });
};

module.exports = {
  getPublicUsers,
  getPublicUserById,
  addPublicUser,
};
