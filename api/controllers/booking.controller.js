const Center = require('../models/center.model')
const User = require('../models/user.model')
const Booking = require('../models/bookings.model')

async function getUserBookings(req, res, next) {
    try {
        const user = await User.findById(res.locals.user.id)
            .populate('bookings')
        res.status(200).send({message: 'This are all your bookings', data: user.bookings})
    } catch (error) {
        next(error)
    }
}

async function createBooking(req, res, next) {
    try {
        const center = await Center.findById(req.params.id)
            .populate('bookings')
            .populate('ratePlan')

        const user = await User.findById(res.locals.user.id)
            .populate('bookings')
        
        
        const ratePlan = center.ratePlan.find(e => e.status === 'active' && e.id === req.body.ratePlan)

        if (ratePlan) {
            req.body.center = req.params.id
            req.body.customerId = res.locals.user.id
            req.body.status = 'open'
            req.body.ratePlan = ratePlan
            const booking = await Booking.create(req.body)
            user.bookings.push(booking)
            user.save()
            center.bookings.push(booking)
            center.save()
            res.status(200).send({message: 'Booking created', data: booking})
        } else {
            res.status(500).send({message: 'Internal error, please try again'})
        }
    } catch (error) {
        next(error)
    }
}

async function cancelBooking(req, res, next) {
    try {
        const booking = await Booking.findById(req.params.id)
        booking.status = 'cancelled'
        booking.save()
        res.status(200).send({message: 'Booking Cancelled', data: booking})
    } catch (error) {
        
    }
}

module.exports = {
    getUserBookings,
    createBooking,
    cancelBooking
}