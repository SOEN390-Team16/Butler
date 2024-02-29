const jwt = require('jsonwebtoken');
const pool = require('../../db');

async function authenticateToken(user, req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.email = decodedToken.email.toLowerCase();

    // Query the PostgreSQL database to find a user with the specified email
    const result = await pool.query('SELECT * FROM $1 WHERE email = $2', [user,req.email]);
    
    if (result.rows.length === 0) {
      return res.status(403).send('Forbidden (Invalid token)');
    }

    // Attach the user information to the request object
    req.user = result.rows[0];

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(403).send('Forbidden (Invalid token)');
  }
}

module.exports = authenticateToken;
