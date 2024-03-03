const jwt = require("jsonwebtoken");
const pool = require("../../db");

async function authenticateToken(req, res, next) {
  console.log("Validating Token...");
  const authHeader = req.headers && req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  if (token == null) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.email = decodedToken.email;
    req.role = decodedToken.role;

    let user = req.role;

    if (user === "renter" || user === "condo_owner" || user === "public_user") {
      user = "public_user";
    } else {
      user = "condo_management_company";
    }

    const result = await pool.query(`SELECT * FROM ${user} WHERE email = $1`, [
      req.email,
    ]);

    if (result.rows.length === 0) {
      return res.status(403).send("Forbidden (Invalid token)");
    }

    // Attach the user information to the request object
    req.user = result.rows[0];

    next();
  } catch (err) {
    console.log(err);
    return res.status(403).send("Forbidden (Invalid token)");
  }
}

module.exports = authenticateToken;
