const Users = require('../models/user.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAllUsers (req, res, next) {
  try {
    const query = req.query || {}
    const users = await Users.find(query)
    res.status(200).json(users)
  } catch (error) { next(error) }
}

async function getUser (req, res, next) {
  try {
    const user = await Users.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) { next(error) }
}

async function updatetUser (req, res, next) {
  try {
    const user = await Users.findById(req.params.id) // Get user profile from database

    if (req.body.password) {
      const hash = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hash
    }

    for (const param in req.body) { // For each param in the body, update user's param, checks for admin on role updates.
      if (Object.hasOwnProperty.call(req.body, param)) {
        if (param === 'role' && res.locals.user.role !== 'admin') {
            res.send(403).send('Error: Only an administrator can update user roles')
          } else {
            const element = req.body[param]
            user[param] = element
          }
      }
    }
    user.save() // Save updated user

    if (req.body.password || req.body.email) { // if e-mail or password are updated, then release new token.
      const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '7d' })
      res.json({ token })
    } else {
      res.json(user)
    }
  } catch (error) { next(error) }
}

async function deleteUser (req, res, next) {
  try {
    const user = await Users.findById(req.params.id)
    user.delete()
    res.status(200).json('Succeed: User has been deleted')
  } catch (error) { next(error) }
}

async function getOwnUser (req, res, next) {
  try {
    const user = await Users.find({ email: res.locals.user.email })
    res.status(200).json(user)
  } catch (error) { next(error) }
}

async function updateOwnUser (req, res, next) {
  try {
    const user = await Users.findOne(res.locals.user) // Get user profile from database

    if (req.body.password) {
      const hash = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hash
    }

    for (const param in req.body) { // For each param in the body, update user's param
      if (Object.hasOwnProperty.call(req.body, param)) {
          if (param === 'role' && res.locals.user.role !== 'admin') {
            res.send(403).send('Error: Only an administrator can update user roles')
          } else {
            const element = req.body[param]
            user[param] = element
          }
      }
    }
    user.save() // Save updated user

    if (req.body.password || req.body.email) { // if e-mail or password are updated, then release new token.
      const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '7d' })
      res.status(200).json({ token })
    } else {
      res.status(200).json(user)
    }
  } catch (error) { next(error) }
}

async function deleteOwnUser (req, res, next) {
  try {
    const user = await Users.findOne({ email: res.locals.user.email })
    user.delete()
    res.status(200).json('Succeed: User has been deleted')
  } catch (error) { next(error) }
}

module.exports = {
  getAllUsers,
  getUser,
  updatetUser,
  deleteUser,
  getOwnUser,
  updateOwnUser,
  deleteOwnUser,
}
