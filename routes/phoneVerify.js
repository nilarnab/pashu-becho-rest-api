const express = require('express');
const res = require('express/lib/response');
const Str = require('@supercharge/strings')
const VerifyToken = require('../models/VerifyToken')
// middleware = require("../middlewares/auth.js")
const {
    json
} = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
const Otps = require('../models/Otps')
var path = require('path');
const {
    randomFillSync
} = require('crypto');
require('dotenv').config();

const AWS = require('aws-sdk')

router.get("/", async (req, res) => {
    var mobile_no = req.query.phone_num;
    let token = Str.random(60);
    try {
        await (new VerifyToken({ phone_num: mobile_no, token: token })).save();
        res.send({ token: token })
    }
    catch (err) {
        console.log(err);
    }
});

router.post("/authComplete", async (req, res) => {
    const token = req.body.token;
    const uid = req.body.uid;
    console.log("completing")
    try {
        VerifyToken.updateOne({ token: token }, { $set: { verified: true, uid: uid } })
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
})
router.get('/waitAuth', async (req, res) => {
    const token = req.query.token;
    const resp = await VerifyToken.find({ token: token })
    // wait till verified becomes true in VerifyToken model
    //and send response as {verdict : True/False}
})

router.get('/reset_otp', async (req, res, next) => {
    /*
    
    accepting parameters
    1. user_id: (str)

    */

    var random_pin = Math.floor(Math.random() * 10000)

    if (random_pin < 1000) {
        random_pin += 1000
    }

    var mobile_no = req.query.phone_num
    var pin = random_pin

    console.log(mobile_no, pin)

    await Otps.deleteMany({
        phone_num: mobile_no
    })

    var new_entry = new Otps()
    new_entry.phone_num = mobile_no
    new_entry.pin = pin

    await new_entry.save()

    //sending otp as message
    sendOTP(mobile_no, pin)


    return res.json({
        verdict: 1,
        message: 'Otp set'
    })
})


function sendOTP(mobileNo, OTP) {

    var params = {
        Message: "Welcome to buyBold! your mobile verification code is: " + OTP + "     Mobile Number is:" + mobileNo,
        /* required */
        PhoneNumber: mobileNo,
    };
    return new AWS.SNS({
        apiVersion: '2010– 03– 31'
    }).publish(params).promise()
        .then(message => {
            console.log("OTP SEND SUCCESS");
        })
        .catch(err => {
            console.log("Error " + err)
            return err;
        });
}


router.post('/send_message', async (req, res, next) => {
    console.log("sending message")
    sendOTP()

})


router.get("/verify_otp", async (req, res, next) => {
    /*
    accepting parameters
    1. user_id (str)
    2. pin (str)

    retunrns true if user_id matches the pin
    */

    var phone_num = req.query.phone_num
    var pin = req.query.pin

    var current_pin = await Otps.find({
        phone_num: phone_num
    })

    console.log(current_pin)

    if (current_pin.length > 0) {
        if (pin == current_pin[0]["pin"]) {

            await Otps.deleteMany({
                phone_num: phone_num
            })


            return res.json({
                verdict: 1,
                message: "OTP ok"
            })
        }
    }




    return res.json({
        verdict: 0,
        message: "OTP incorrect"
    })
})


module.exports = router