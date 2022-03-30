const mongoose = require('mongoose')

const servicesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    icon: {
        type: String
    }
})

module.exports = servicesSchema