const pool = require('../../db')
const queriesPU = require('../PublicUser/queries')
const queriesCMC = require('../CMC/queries')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtRefreshKey = process.env.REFRESH_TOKEN_SECRET

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, jwtSecretKey, { expiresIn: '30m' })
  const refreshToken = jwt.sign(payload, jwtRefreshKey)
  return { token: accessToken, refreshToken }
}

const loginUserPU = async (email, password) => {
  try {
    const resultPU = await pool.query(queriesPU.checkIfPUEmailExists, [email])
    if (resultPU.rows.length === 0) {
      return null
    }

    const user = resultPU.rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    return passwordMatch
      ? generateTokens({
        userId: user.userid,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
      })
      : null
  } catch (error) {
    console.error('Error during loginUserPU:', error)
  }
}

const loginUserCMC = async (email, password) => {
  try {
    const resultCMC = await pool.query(queriesCMC.checkIfCMCEmailExists, [email])
    if (resultCMC.rows.length === 0) {
      return null
    }

    const cmc = resultCMC.rows[0]
    const passwordMatch = await bcrypt.compare(password, cmc.password)

    return passwordMatch
      ? generateTokens({
        cmcId: cmc.companyid,
        cmcName: cmc.company_name,
        email: cmc.email,
        role: cmc.role
      })
      : null
  } catch (error) {
    console.error('Error during loginUserCMC:', error)
  }
}

const login = async (req, res) => {
  console.log('Logging in: ')
  const { email, password } = req.body

  const placeholderRes = {
    send: (data) => console.log(data),
    status: (code) => ({ json: (data) => console.log(`${code}: ${data.message}`) })
  }

  const response = res || placeholderRes

  try {
    const tokenPU = await loginUserPU(email, password)

    if (tokenPU) {
      return response.send(tokenPU)
    }

    const tokenCMC = await loginUserCMC(email, password)
    if (tokenCMC) {
      return response.send(tokenCMC)
    }

    return response.status(401).json({ message: 'Invalid email or password' })
  } catch (error) {
    console.error('Error during login:', error)
    return response.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = { login, loginUserPU, loginUserCMC }
