require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/refresh', async (req, res) => {
  console.log('Refreshing Token...')
  const refreshToken = req.body.refreshToken
  const email = (jwt.decode(refreshToken)).email
  const username = req.body.username
  const user = { name: username }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(500).json({ error: 'internal Error Refreshing Token' })
    }
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
    res.json({ accessToken })
  })
})

module.exports = router
