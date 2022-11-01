const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const searchableSchema = new mongo.Schema({
    prod_id: {
        type: String,
        required: true
    },
    search_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Searchable', searchableSchema)


