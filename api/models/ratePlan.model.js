const mongoose = require('mongoose')

const servicesSchema = require('./services.model')

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
    },
    servicesIncluded: [servicesSchema]
})

module.exports = ratePlanSchema