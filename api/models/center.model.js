const mongoose = require('mongoose')

const servicesSchema = require('./services.model')
const ratePlanSchema = require('./ratePlan.model')
const allotmentSchema = require('./allotment.model')


const linksSchema = new mongoose.Schema({
    linkType: {
        type: String,
        enum: ['website','twitter','instagram','facebook']
    },
    linkUrl: {
        type: String
    }
})

const centerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    photos: {
        type: Array
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    postalCode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    workingHours: {
        type: String
    },
    phone: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    links: [linksSchema],
    services: [servicesSchema],
    ratePlan: [ratePlanSchema],
    allotment: [allotmentSchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

centerSchema.index({name: 'query'})

const centerModel = mongoose.model('center',centerSchema)
module.exports = centerModel