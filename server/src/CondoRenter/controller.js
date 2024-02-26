const pool = require("../../db");
const queries = require("./queries");

const getCondoRenters = (req, res) => {
  console.log("Get All Condo Renters");
  pool.query(queries.getCondoRenters, (error, results) => {
    if (error) return res.json(error);
    res.status(200).json(results.rows);
  });
};

const getCondoRenterById = (req, res) => {
  console.log("Getting Condo Renter With ID:");
  console.log(req.params.renterid);
  const renterid = parseInt(req.params.renterid);
  pool.query(queries.getCondoRenterById, [renterid], (error, results) => {
    if (results.rows.length == 0) res.send("No Condo Renter found.");
    else res.status(200).json(results.rows);
  });
};

const addCondoRenter = (req, res) => {
  const { renterid, userid } = req.body;
  pool.query(queries.checkIfUserIdExists, [userid], (error, results) => {
    if (results.rows.length) {
      res.send("User Is Already A Renter.");
    } else {
      pool.query(
        queries.addCondoRenter,
        [renterid, userid],
        (error, result) => {
          if (error) return res.json(error);
        }
      );
      pool.query(queries.updateToRenterRole, [userid], (error, result) => {
        if (error) return res.json(error);
        res.status(201).send("Public User Is Now A Renter!");
      });
    }
  });
};

module.exports = {
  getCondoRenters,
  getCondoRenterById,
  addCondoRenter,
};
