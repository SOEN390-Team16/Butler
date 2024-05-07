const { Router } = require('express')
const controller = require('./controller')
const router = Router()

router.get('/', controller.googleAuth)
router.get('/callback', controller.googleAuthCallback)

module.exports = router
