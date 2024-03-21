const pool = require("../../db");
const queries = require("./queries");

const getEmployees = (req, res) => {
  console.log("Get All Employees");
  pool.query(queries.getEmployees, (error, results) => {
    if (error) {
      // console.error('Error finding Employees: ', error)
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "Employees not found" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getEmployeeByID = (req, res) => {
  console.log("get a specific Employee");
  const empid = parseInt(req.params.empid);
  pool.query(queries.getEmployeeByID, [empid], (error, results) => {
    if (error) {
      // console.error('Error getting employee:', error)
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const addEmployee = async (req, res) => {
  console.log("add an Employee");
  const { first_name, last_name, companyid, role, property_id } = req.body;
  try {
    const companyExists = await pool.query(queries.checkIfCompanyExists, [
      companyid,
    ]);
    if (companyExists.rows.length === 0) {
      return res.status(404).send("Company ID does not exist");
    }

    const propertyExists = await pool.query(queries.checkIfPropertyExists, [
      property_id,
    ]);
    if (propertyExists.rows.length === 0) {
      return res.status(404).send("Property ID does not exist");
    }

    await pool.query(queries.addEmployee, [
      first_name,
      last_name,
      companyid,
      role,
      property_id,
    ]);
    const createdEmployee = {
      first_name,
      last_name,
      companyid,
      role,
      property_id,
    };
    return res.status(201).json({
      message: "Employee Created Successfully!",
      employee: createdEmployee,
    });
  } catch (error) {
    // console.error('Error Adding Employee:', error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  const empid = req.params.empid;
  const { first_name, last_name, companyid, role, property_id } = req.body;

  if (
    !first_name &&
    !last_name &&
    !companyid &&
    !role === undefined &&
    !property_id
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
  if (companyid !== undefined) {
    setClauses.push("companyid = $" + (values.length + 1));
    values.push(companyid);
  }
  if (role !== undefined) {
    setClauses.push("role = $" + (values.length + 1));
    values.push(role);
  }
  if (property_id !== undefined) {
    setClauses.push("property_id = $" + (values.length + 1));
    values.push(property_id);
  }

  const query = `UPDATE employee SET ${setClauses.join(
    ", "
  )} WHERE employeeid = $${values.length + 1}`;

  pool.query(queries.getEmployeeByID, [empid], (error, results) => {
    if (error) {
      // console.error('Error updating user:', error)
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    } else {
      pool.query(query, [...values, empid], (error, result) => {
        if (error) {
          // console.error('Error updating employee:', error)
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.rowCount === 0) {
          return res.status(404).json({ error: "Employee not found" });
        }
        pool.query(queries.getEmployeeByID, [empid], (error, results) => {
          if (error) {
            // console.error('Error retrieving updated employee:', error)
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(201).json({
            message: "Employee Updated Successfully!",
            employee: results.rows,
          });
        });
      });
    }
  });
};

const removeEmployee = (req, res) => {
  const empid = parseInt(req.params.empid);
  pool.query(queries.getEmployeeByID, [empid], (error, result) => {
    if (error) {
      // console.error('Error finding user:', error)
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    pool.query(queries.removeEmployee, [empid], (error, results) => {
      if (error) {
        // console.error('Error removing user:', error)
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).send("Employee removed successfully.");
    });
  });
};

module.exports = {
  getEmployees,
  getEmployeeByID,
  addEmployee,
  updateEmployee,
  removeEmployee,
};
