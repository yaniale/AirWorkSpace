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
        type: Number,
        default: 0
    },
    tax: {
        type: Number
    },
    minBookingTime: {
        type: Boolean,
        default: false
    },
    minBookingDays: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
})

module.exports = ratePlanSchema