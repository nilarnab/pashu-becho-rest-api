const express = require("express");
const router = express.Router();
const Sessions = require("../models/Sessions");
const Users = require("../models/Users");
const Monitor = require("../models/Monitor");


router.get('/send_metric', async (req, res, next) => {

    console.log(req.query)

    var date = new Date()

    var response = await Monitor.insertMany([{
        'action': req.query.action,
        'value': req.query.value,
        'timestamp': date,
    }])

    return res.json({
        verdict: 1,
        response,
    })


})

module.exports = router;
