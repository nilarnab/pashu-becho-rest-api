const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
const Otps = require('../models/Otps')
const Carts = require('../models/Carts')
const Products = require('../models/Product')
const Activity = require("../models/Activity")
const FeedItems = require("../models/FeedItems")
var path = require('path');
const { randomFillSync } = require('crypto');
require('dotenv').config();

const POSTS_PER_PAGE = 4;


router.get("/get_feed", async (req, res, next) => {


    // initialization
    var user_id = req.query.user_id
    var page = req.query.page

    // does not user if for now, but later it will be used

    if (user_id == null || page == null) {
        return res.json({
            verdict: 0,
            message: "missing fields provided"
        })
    }
    else {

        var data_length = await FeedItems.countDocuments({})

        limit_val = page * POSTS_PER_PAGE
        skip_val = (page - 1) * POSTS_PER_PAGE

        if (page * POSTS_PER_PAGE > data_length) {
            limit_val = (page * POSTS_PER_PAGE) % data_length + POSTS_PER_PAGE
            skip_val = limit_val - POSTS_PER_PAGE
        }

        // for now not adapting
        var feed_items = await FeedItems.find({}).limit(limit_val).skip(skip_val)

        var sendable_feeds = []

        // console.log(feed_items)

        feed_items.forEach(async (feed_item, i) => {

            // console.log(feed_item)

            var sendable_feed = {}

            var products = feed_item.products

            var sendable_products = []
            // console.log(products)

            products.forEach(async (product, j) => {

                var sendable_product = await Products.findById(product)

                sendable_products.push(sendable_product)

                if (sendable_products.length == products.length) {

                    sendable_feed["title"] = feed_item.title
                    sendable_feed["description1"] = feed_item.description1
                    sendable_feed["description2"] = feed_item.description2
                    sendable_feed["products"] = sendable_products
                    sendable_feed["holdimage"] = feed_item.holdimage
                    sendable_feed["posterimage"] = feed_item.posterimage
                    sendable_feed["videoUrl"] = feed_item.videoUrl

                    sendable_feeds.push(sendable_feed)

                    if (sendable_feeds.length == feed_items.length) {

                        return res.json({
                            verdict: 1,
                            response: sendable_feeds
                        })

                    }

                }

            })

        })
    }

})


// router.get('/create', async (req, res, next) => {

//     // create a new entry in feed items

//     var response = await FeedItems.insertMany([
//         {
//             title: "This is title 1",
//             description1: "This is description 1"
//         },
//     ])

//     return res.json(
//         {
//             response
//         }
//     )

// })

module.exports = router