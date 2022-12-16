const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const monitorSchema = new mongo.Schema({
    action: {
        type: String,
    },
    value: {
        type: Number,
    },
    timestamp: {
        type: Date,
    },
})

module.exports = mongoose.model('Monitor', monitorSchema)


