const mongoose = require('mongoose')

const ratePlanSchema = require('./ratePlan.model')

const bookingsSchema = new mongoose.Schema({
    fromTime: {
        type: Date
    },
    toTime: {
        type: Date
    },
    type: {
        type: String,
        enum: ['fixedDesk','hotDesk','office','meetingRoom']
    },
    ratePlan: [ratePlanSchema],
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'center'
    },
    bookedQuantity: {
        type: Number
    },
    totalRate: {
        type: Number
    },
    totalDiscount: {
        type: Number
    },
    totalTax: {
        type: Number
    },
    status: {
        type: String,
        enum: ['open','confirmed','cancelled']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    creationDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const bookingsModel = mongoose.model('booking', bookingsSchema)
module.exports = bookingsModel;