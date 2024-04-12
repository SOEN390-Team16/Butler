const { Router } = require('express')
const controller = require('./controller')
const authenticateToken = require('../auth/tokenValidator')
const router = Router()
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

router.post('/', authenticateToken, upload.single('image'), controller.uploadImage)

module.exports = router
