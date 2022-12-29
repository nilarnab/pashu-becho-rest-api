const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const orderSetSchema = new mongo.Schema({
    user_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    valid: {
        type: Number,
        default: 1
    },
    stage: {
        type: Number,
        default: 0
    },
    cancel_code: {
        type: Number,
    },
    cancel_reason: {
        type: String,
    }
})

module.exports = mongoose.model('OrderSets', orderSetSchema)


