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
    createBooking,
    updateBookingStatus
} = require('../controllers/booking.controller')

router.get('/', getAllCenters)
router.get('/:id', getCenter)
router.post('/', checkAuth, checkHost, createCenter)
router.post('/:id/bookings', checkAuth, createBooking)
router.put('/:id/allotment', checkAuth, checkHost, manageAllotment)
router.put('/:id/rateplan', checkAuth, checkHost, manageRatePlan)
router.put('/:id/bookings/:bookingId', checkAuth, checkHost, updateBookingStatus)
router.put('/:id', checkAuth, checkHost, updateCenter)
router.delete('/:id', checkAuth, checkHost, deleteCenter)


module.exports = router