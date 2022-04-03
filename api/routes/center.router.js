const router = require('express').Router()

const {
    checkAuth,
    checkHost
} = require('../utils')

const {
//    getCenter,
    getAllCenters,
//    updateCenter,
    createCenter,
//    deleteCenter
} = require('../controllers/center.controller')

router.get('/', getAllCenters)
router.post('/', checkAuth, checkHost, createCenter)
// router.get('/:id', getCenter)
// router.put('/:id', checkAuth, checkHost, updateCenter)
// router.delete('/:id', checkAuth, checkHost, deleteCenter)

module.exports = router