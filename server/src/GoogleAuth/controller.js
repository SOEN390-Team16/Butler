const pool = require('../../db')
const queries = require('../PublicUser/queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtRefreshKey = process.env.REFRESH_TOKEN_SECRET

const CLIENT_URL = 'http://hortzcloud.com:8080'

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

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })

const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', async (err, profile) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    // Check if the user already exists in your database based on Google profile data
    const email = profile.emails[0].value
    try {
      const userExists = await pool.query(queries.checkIfPUEmailExists, [email])

      // If user exists, generate tokens and redirect to appropriate dashboard
      if (userExists.rows.length !== 0) {
        // Get user information
        const userData = userExists.rows[0]
        const token = generateTokens({
          userid: userData.userid,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          role: userData.role,
          profile_picture: userData.profile_picture
        })

        switch (String(userData.role)) {
          case 'condo_owner':
            return res.redirect(`${CLIENT_URL}/DashBoardHomeCO?token=${token.accessToken}`)
          case 'renter':
            return res.redirect(`${CLIENT_URL}/DashBoardHomeCR?token=${token.accessToken}`)
          case 'public_user':
            return res.redirect(`${CLIENT_URL}/DashboardHome/editUser?token=${token.accessToken}`)
          default:
            return res.status(404).json({ error: 'Error fetching user role' })
        }
      } else {
        const hashedPassword = await bcrypt.hash(profile.id, 5) // Using Google profile ID as password
        const { displayName } = profile
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ')[1]

        // Add user to database
        await pool.query(queries.addPublicUser, [firstName, lastName, email, hashedPassword])

        // Get user information
        const userData = await pool.query(queries.getPublicUserByEmail, [email])

        // Generate tokens and redirect to public dashboard
        const token = generateTokens({
          userid: userData.userid,
          first_name: userData.first_name,
          last_lame: userData.last_name,
          email: userData.email,
          role: userData.role,
          profile_picture: userData.profile_picture
        })

        return res.redirect(`${CLIENT_URL}/DashboardHome/editUser?token=${token.accessToken}`)
      }
    } catch (error) {
      console.error('Error signing up with Google:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })(req, res, next)
}

module.exports = {
  googleAuth,
  googleAuthCallback
}
