const pool = require("../../db");
const queries = require("./queries");

const getCondoRenters = (req, res) => {
  console.log("get all Condo Renters");
  pool.query(queries.getCondoRenters, (error, results) => {
    if (error) {
      console.error("Error finding condo renters:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "condo renters not found" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getCondoRenterById = (req, res) => {
  console.log("get condo renter by id");
  const renterid = parseInt(req.params.renterid);
  pool.query(queries.getCondoRenterById, [renterid], (error, results) => {
    if (error) {
      console.error("Error finding condo renter:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Condo Renter Not Found" });
    }
    res.status(200).json(results.rows);
  });
};

const addCondoRenter = (req, res) => {
  console.log("add a condo renter");
  const { email } = req.body;
  pool.query(queries.checkIfCREmailExists, [email], (error, results) => {
    if (error) {
      console.error("Error checking email existence:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.rows.length === 0) {
      res.status(400).json({ error: "Email Doesn't Exists" });
    } else {
      pool.query(
        queries.checkIfUserAlreadyExists,
        [email],
        (error, results) => {
          if (error) {
            console.log("Error checking if condo renter already exists");
          }
          const isPublicUser = results.rows[0]["?column?"];
          if (isPublicUser) {
            res.status(400).json({ error: "User already exists" });
          } else {
            pool.query(queries.addCondoRenter, [email], (error, result) => {
              if (error) {
                console.error("Error adding condo renter:", error);
                return res.status(500).json({ error: "Internal Server Error" });
              }
              res.status(201).send("Condo Renter Created Successfully!");
            });
            pool.query(queries.updateParentToRenter, (error, result) => {
              if (error) {
                console.error("Error updating parent table:", error);
                return res.status(500).json({ error: "Internal Server Error" });
              }
              console.log("Parent Table Updated Successfully!");
            });
          }
        }
      );
    }
  });
};

const updateCondoRenter = (req, res) => {
  const renterid = req.params.renterid;
  const { first_name, last_name, email, password, profile_picture } = req.body;

  if (
    !first_name &&
    !last_name &&
    !email &&
    !password &&
    profile_picture === undefined
  ) {
    return res
      .status(400)
      .json({ error: "At least one field is required for updating" });
  }

  const setClauses = [];
  const values = [];

  if (first_name) {
    setClauses.push("first_name = $" + (values.length + 1));
    values.push(first_name);
  }
  if (last_name) {
    setClauses.push("last_name = $" + (values.length + 1));
    values.push(last_name);
  }
  if (email) {
    setClauses.push("email = $" + (values.length + 1));
    values.push(email);
  }
  if (password) {
    setClauses.push("password = $" + (values.length + 1));
    values.push(password);
  }
  if (profile_picture !== undefined) {
    setClauses.push("profile_picture = $" + (values.length + 1));
    values.push(profile_picture);
  }

  const query = `UPDATE public_user SET ${setClauses} WHERE userid = (SELECT userid FROM renter WHERE renterid = $${
    values.length + 1
  })`;

  pool.query(queries.getCondoRenterById, [renterid], (error, results) => {
    if (error) {
      console.error("Error finding condo renter:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Ccondo renter Not Found" });
    } else {
      pool.query(query, [...values, renterid], (error, result) => {
        if (error) {
          console.error("Error updating condo renter:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.rowCount === 0) {
          return res.status(404).json({ error: "condo renter not found" });
        }

        res.status(200).json({ message: "condo renter updated successfully" });
      });
    }
  });
};

const removeCondoRenter = (req, res) => {
  const renterid = parseInt(req.params.renterid);
  pool.query(queries.getCondoRenterById, [renterid], (error, result) => {
    if (error) {
      console.error("Error finding condo renter:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "condo renter not found" });
    } else {
      pool.query(
        queries.updateParentToPublicUser,
        [renterid],
        (error, results) => {
          if (error) {
            console.error("Error Updating Public User: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
        }
      );
      pool.query(queries.removeCondoRenter, [renterid], (error, results) => {
        if (error) {
          console.error("Error removing condo renter:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
      res.status(200).send("condo renter removed successfully.");
    }
  });
};

module.exports = {
  getCondoRenters,
  getCondoRenterById,
  addCondoRenter,
  updateCondoRenter,
  removeCondoRenter,
};
