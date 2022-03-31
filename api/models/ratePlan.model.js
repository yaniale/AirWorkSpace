const mongoose = require('mongoose')

const ratePlanSchema = new mongoose.Schema({
    name: {
        type: String
    },
    appliesTo: {
        type: String,
        enum: ['fixedDesk','hotDesk','office','meetingRoom']
    },
    fromDate: {
        type: Date
    },
    toDate: {
        type: Date
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number
    },
    tax: {
        type: Number
    },
    minBookingTime: {
        type: Boolean
    },
    minBookingDays: {
        type: Number
    }
})

module.exports = ratePlanSchema