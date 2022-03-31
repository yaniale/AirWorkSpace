const router = require('express').Router()
const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const centerRouter = require('./center.router')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/center', centerRouter)

module.exports = router
