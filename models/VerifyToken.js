const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')
const { options } = require('superagent')
const VerifyTokenSchema = new mongo.Schema({
    phone_num: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    uid: { type: String, default: null }
    ,
    verified: { type: Boolean, default: false }
    ,
    createdAt: { type: Date, default: Date.now() },
}, {
    expireAfterSeconds: 120
})
module.exports = mongoose.model('VerifyTokens', VerifyTokenSchema)


