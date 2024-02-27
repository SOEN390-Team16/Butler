const pool = require('../../db');
const queries = require('../PublicUser/queries')

const login = (req, res) => {
  console.log("Logging in: ");
  const { email, password } = req.body;

  const loginUser = async () => {
    try {
      const result = await pool.query(queries.checkIfEmailExists, [email]);

      if (result.rows.length === 0) {
        return { success: false, message: 'Invalid email or password' };
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { success: false, message: 'Invalid email or password' };
      }

      const tokenPayload = {
        userId: user.userid,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      };

      const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '1h' });

      return { success: true, token };

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
