const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/', controller.googleAuth)
router.get('/callback', controller.googleAuthCallback)
router.get('/signin', controller.googleSignIn)
router.get('/login/callback', controller.googleSignInCallback)

module.exports = router
