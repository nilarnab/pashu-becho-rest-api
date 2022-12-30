const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const monitorPageEngagementSchema = new mongo.Schema({
    userID: {
        type: String,
        required: true,
    },
    // userid_pagename: {
    //     type: String,
    //     default: function () {
    //         return this.userid + '_' + this.pagename
    //     }
    // },
    sessionID:{type:String},
    timestamp: {
        type: Date,
    },
    // actions can be one from ["browsed","searched","wishlisted","addedToCart","unWislisted","removedFromCart","ordered"]
    action:{type:String},
    productID:{type:String}
})

module.exports = mongoose.model('monitorPageEngagement', monitorPageEngagementSchema)


