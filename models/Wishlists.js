
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const wishlistSchema = new mongo.Schema({
    user_id: {
        type: String,
        required: true
    },
    prod_id: {
        type: String,
        required: true
    },

    valid: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Wishlist', wishlistSchema)


