const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const OrderSets = require('./OrderSets')
const mongo = require('mongoose')
const uuidv4 = require('uuid').v4

const orderSchema = new mongo.Schema({
    user_id: {
        type: String,
        required: true
    },
    prod_id: {
        type: String,
        required: true
    },
    qnt: {
        type: Number,
        required: true
    },
    valid: {
        type: Number,
        default: 1
    },
    order_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Orders', orderSchema)


