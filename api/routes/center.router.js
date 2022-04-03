const router = require('express').Router()

const {
    checkAuth,
    checkHost
} = require('../utils')

const {
    getCenter,
    getAllCenters,
    updateCenter,
    createCenter,
    manageAllotment,
    manageRatePlan,
    deleteCenter
} = require('../controllers/center.controller')

const {
    createBooking
} = require('../controllers/booking.controller')

router.get('/', getAllCenters)
router.post('/', checkAuth, checkHost, createCenter)
router.get('/:id', getCenter)
router.put('/:id/allotment', checkAuth, checkHost, manageAllotment)
router.put('/:id/rateplan', checkAuth, checkHost, manageRatePlan)
router.post('/:id/bookings', checkAuth, createBooking)
router.put('/:id', checkAuth, checkHost, updateCenter)
router.delete('/:id', checkAuth, checkHost, deleteCenter)

module.exports = router