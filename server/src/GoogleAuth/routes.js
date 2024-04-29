const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/google/signup', controller.googleSignUp)
router.get('/google/signup/callback', controller.googleSignUpCallback)
router.get('/google/signin', controller.googleSignIn)
router.get('/google/signin/callback', controller.googleSignInCallback)

module.exports = router
