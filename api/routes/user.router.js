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
} = require('../controllers/user.controller')

router.get('/', checkAuth, checkAdmin, getAllUsers)
router.get('/profile', checkAuth, getOwnUser)
router.put('/profile', checkAuth, updateOwnUser)
router.delete('/profile', checkAuth, deleteOwnUser)
router.get('/:id', checkAuth, checkAdmin, getUser)
router.put('/:id', checkAuth, checkAdmin, updatetUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)

module.exports = router