const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const resourceSchema = new mongo.Schema({
    url: {
        type: String,
        required: true
    },
    prod_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    primary: {
        type: Number,
        default: 0
    }
    
})

module.exports = mongoose.model('images', resourceSchema)


