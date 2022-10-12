const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const cartSchema = new mongo.Schema({
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
    }
})

module.exports = mongoose.model('Carts', cartSchema)


