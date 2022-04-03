const router = require('express').Router()
const {
  checkAuth,
  checkAdmin
} = require('../utils')

const {
  getAllUsers,
  getUser,
  updatetUser,
  deleteUser,
  getOwnUser,
  updateOwnUser,
  deleteOwnUser,
  manageFavourite,
  getFavourites
} = require('../controllers/user.controller')

const {
  getUserBookings
} = require('../controllers/booking.controller')

router.get('/', checkAuth, checkAdmin, getAllUsers)
router.get('/profile', checkAuth, getOwnUser)
router.put('/profile', checkAuth, updateOwnUser)
router.delete('/profile', checkAuth, deleteOwnUser)
router.get('/profile/favourites', checkAuth, getFavourites)
router.put('/profile/favourites/:id', checkAuth, manageFavourite)
router.get('/profile/bookings', checkAuth, getUserBookings)
router.get('/:id', checkAuth, checkAdmin, getUser)
router.put('/:id', checkAuth, checkAdmin, updatetUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)

module.exports = router