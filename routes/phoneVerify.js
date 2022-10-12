const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
const Otps = require('../models/Otps')
var path = require('path');
const { randomFillSync } = require('crypto');
require('dotenv').config();


router.get('/reset_otp', async (req, res, next) => 
{
    /*
    
    accepting parameters
    1. user_id: (str)

    */

    var random_pin =  Math.floor(Math.random() * 10000)

    if (random_pin < 1000)
    {
        random_pin += 1000
    }

    var user_id = req.query.user_id
    var pin = random_pin

    console.log(user_id, pin)

    await Otps.deleteMany({
        user_id: user_id
    })
    
    var new_entry = new Otps()
    new_entry.user_id = user_id
    new_entry.pin = pin

    await new_entry.save()

    return res.json(
        {
            verdict: 1,
            pin: pin
        }
    )
})


router.get("/verify_otp", async (req, res, next) => 
{
    /*
    accepting parameters
    1. user_id (str)
    2. pin (str)

    retunrns true if user_id matches the pin
    */

    var user_id = req.query.user_id
    var pin = req.query.pin

    var current_pin = await Otps.find({
        user_id: user_id
    })

    if (current_pin.length > 0)
    {
        if (pin == current_pin[0]["pin"])
        {
            return res.json(
                {
                    verdict: 1,
                    message: "OTP ok"
                }
            )
        }
    }

    return res.json(
        {
            verdict: 0,
            message: "OTP incorrect"
        }
    )
})


module.exports = router