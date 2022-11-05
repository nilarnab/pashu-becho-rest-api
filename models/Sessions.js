const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const sessionSchema = new mongo.Schema({
    user_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    timestamp_human: {
        type: String,
    },
    alive: {
        type: Boolean,
        default: true
    },

})

module.exports = mongoose.model('Sessions', sessionSchema)


