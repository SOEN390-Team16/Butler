const pool = require('../../db');
const queriesPU = require('../PublicUser/queries');
const queriesCMC = require('../CMC/queries');
const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const loginUserPU = async (email, password) => {
  const resultPU = await pool.query(queriesPU.checkIfPUEmailExists, [email]);
  if (resultPU.rows.length === 0) {
    return null;
  }

  const user = resultPU.rows[0];
  if (password !== user.password) {
    return null;
  }

  const tokenPayload = {
    userId: user.userid,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role
  };
  return jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '1h' });
};

const loginUserCMC = async (email, password) => {
  const resultCMC = await pool.query(queriesCMC.checkIfCMCEmailExists, [email]);
  if (resultCMC.rows.length === 0) {
    return null;
  }

  const cmc = resultCMC.rows[0];
  if (password !== cmc.password) {
    return null;
  }

  const tokenPayload = {
    cmcId: cmc.companyid,
    cmcName: cmc.company_name,
    email: cmc.email,
    role: cmc.role
  };
  return jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '1h' });
};

const login = async (req, res) => {
  console.log("Logging in: ");
  const { email, password } = req.body;

  try {
    const tokenPU = await loginUserPU(email, password);
    if (tokenPU) {
      return res.json({ token: tokenPU });
    }

    const tokenCMC = await loginUserCMC(email, password);
    if (tokenCMC) {
      return res.json({ token: tokenCMC });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login };
