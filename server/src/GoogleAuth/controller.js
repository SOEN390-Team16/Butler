const pool = require('../../db')
const queries = require('../PublicUser/queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtRefreshKey = process.env.REFRESH_TOKEN_SECRET

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, jwtSecretKey, { expiresIn: '30m' })
  const refreshToken = jwt.sign(payload, jwtRefreshKey)
  return { accessToken, refreshToken }
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile)
}))

const googleSignUp = passport.authenticate('google', { scope: ['profile', 'email'] })

const googleSignUpCallback = (req, res, next) => {
  passport.authenticate('google', async (err, profile) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    // Check if the user already exists in your database based on Google profile data
    const email = profile.emails[0].value
    try {
      const userExists = await pool.query(queries.checkIfPUEmailExists, [email])
      if (userExists.rows.length !== 0) {
        return res.status(409).json({ error: 'User already exists' })
      } else {
        const hashedPassword = await bcrypt.hash(profile.id, 5) // Using Google profile ID as password
        const { displayName } = profile
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ')[1]
        await pool.query(queries.addPublicUser, [firstName, lastName, email, hashedPassword])
        return res.status(201).json({ message: 'User signed up successfully' })
      }
    } catch (error) {
      console.error('Error signing up with Google:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })(req, res, next)
}

const googleSignIn = passport.authenticate('google', { scope: ['profile', 'email'] })

const googleSignInCallback = (req, res, next) => {
  passport.authenticate('google', async (err, profile) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    // Check if the user already exists in your database based on Google profile data
    const email = profile.emails[0].value
    try {
      const user = await pool.query(queries.getPublicUserByEmail, [email])
      if (user.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      const userData = user.rows[0]
      const token = generateTokens({
        userId: userData.userid,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        role: userData.role
      })
      return res.status(200).json({ message: 'User signed in successfully', token })
    } catch (error) {
      console.error('Error signing in with Google:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })(req, res, next)
}

module.exports = {
  googleSignUp,
  googleSignUpCallback,
  googleSignIn,
  googleSignInCallback
}
