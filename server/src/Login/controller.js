const pool = require('../../db');
const queriesPU = require('../PublicUser/queries');
const queriesCMC = require('../CMC/queries');
const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const login = (req, res) => {
  console.log("Logging in: ");
  const { email, password } = req.body;

  const loginUser = async () => {
    try {
      const resultPU = await pool.query(queriesPU.checkIfPUEmailExists, [email]);
      const resultCMC = await pool.query(queriesCMC.checkIfCMCEmailExists, [email]);

      if (resultPU.rows.length === 0 && resultCMC.rows.length == 0) {
          return { success: false, message: 'Invalid email' };
      }

      if (resultPU.rows.length != 0) {
        const user = resultPU.rows[0];
        if (password !== user.password) {
          return { success: false, message: 'Invalid password' };
        }

        const tokenPayload = {
          userId: user.userid,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        };
        console.log(tokenPayload);

        const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '1h' });
        return { success: true, token };
      }

      if (resultCMC.rows.length != 0) {
        const cmc = resultCMC.rows[0];
        if (password !== cmc.password) {
          return { success: false, message: 'Invalid password' };
        }

        const tokenPayload = {
          cmcId: cmc.companyid,
          cmcName: cmc.company_name,
          email: cmc.email,
          role: cmc.role
        };
        console.log(tokenPayload);

        const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '1h' });
        return { success: true, token };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Internal Server Error' };
    }
  };

  loginUser()
    .then((result) => {
      if (result.success) {
        res.json({ token: result.token });
      } else {
        res.status(401).json({ message: result.message });
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};

module.exports = { login };
