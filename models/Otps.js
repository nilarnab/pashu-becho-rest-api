const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const otpSchema = new mongo.Schema({
    phone_num: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Otps', otpSchema)


