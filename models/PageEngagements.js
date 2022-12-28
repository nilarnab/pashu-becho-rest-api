const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const monitorPageEngagementSchema = new mongo.Schema({
    pagename: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    pagesubname: {
        type: String,
    },
    userid_pagename: {
        type: String,
        default: function () {
            return this.userid + '_' + this.pagename
        }
    },
    timestamp: {
        type: Date,
    },
})

module.exports = mongoose.model('monitorPageEngagement', monitorPageEngagementSchema)


