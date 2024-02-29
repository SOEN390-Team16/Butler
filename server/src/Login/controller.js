const pool = require('../../db');
const queriesPU = require('../PublicUser/queries');
const queriesCMC = require('../CMC/queries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtRefreshKey = process.env.REFRESH_TOKEN_SECRET
const loginUserPU = async (email, password) => {
  const resultPU = await pool.query(queriesPU.checkIfPUEmailExists, [email]);
  if (resultPU.rows.length === 0) {
    return null;
  }

  const user = resultPU.rows[0];
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch)
   if (!passwordMatch) {
    return null;
  }

  const tokenPayload = {
    userId: user.userid,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '30m' });
  const refreshToken = jwt.sign(tokenPayload, jwtRefreshKey);
  return { token: accessToken, refreshToken };
};

const loginUserCMC = async (email, password) => {
  const resultCMC = await pool.query(queriesCMC.checkIfCMCEmailExists, [email]);
  if (resultCMC.rows.length === 0) {
    return null;
  }

  const cmc = resultCMC.rows[0];
  const passwordMatch = await bcrypt.compare(password, cmc.password);

  if (!passwordMatch) {
    return null;
  }

  const tokenPayload = {
    cmcId: cmc.companyid,
    cmcName: cmc.company_name,
    email: cmc.email,
    role: cmc.role
  };

  const accessToken = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '30m' });
  const refreshToken = jwt.sign(tokenPayload, jwtRefreshKey);
  return { token: accessToken, refreshToken };
};

const login = async (req, res) => {
  console.log("Logging in: ");
  const { email, password } = req.body;

  try {
    const tokenPU = await loginUserPU(email, password);
  
    if (tokenPU) {
      return res.send(tokenPU);
    }

    const tokenCMC = await loginUserCMC(email, password);
    if (tokenCMC) {
      return res.send(tokenCMC);
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login };
