const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()

router.get('/', authenticateToken, controller.getPublicUsers)
router.get('/:userid', authenticateToken, controller.getPublicUserById)
router.post('/', controller.addPublicUser)
router.patch('/:userid', authenticateToken, controller.updatePublicUser)
router.delete('/:userid', authenticateToken, controller.removePublicUser)
router.get('/google/signup', controller.googleSignUp)
router.get('/google/signup/callback', controller.googleSignUpCallback)

module.exports = router
