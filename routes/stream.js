const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
const Resource = require('../models/Resource');
const Activity=require("../models/Activity");
var path = require('path');
const { resourceUsage } = require('process');
require('dotenv').config();


// for streaming service

router.get('/get_video', async (req, res, next) => {
    const id = req.query.id;
    // console.log(process.env.UPLOADS_VID_HIGH)
    // console.log(path.resolve(__dirname + "/../"))
    return res.sendFile(process.env.UPLOADS_VID_HIGH + "batman_dark_knight_trailer.mp4", { root: path.resolve(__dirname + "/../") })

})

router.get('/getResources', async (req, res) => {
    let id = req.query.pid;
    let userID=req.query.uid;
    // console.log(id,userID)
    if (!id || !userID) {
        return res.sendStatus(403);
    }
    try {

        //browsed activity
        try {
            const resp=await (new Activity({ action: "browsed", productID: id, timestamp: Date.now(), userID: userID })).save();
        }
        catch (err) {
            console.log(err);
            // res.sendStatus(500);
        }

        const resources = await Resource.find({ productID: id });

        // console.log("sending resources : - ",id,resources);
        res.send(resources);
    }
    catch (err) {
        // console.log(err);
        res.sendStatus(500);
    }
})

router.get("/addVideo", async (req, res) => {
    try {
        await (new Resource({ productID: "6346cb0d7b054c3bf2d50cd6", type: "video" })).save();
        res.sendStatus(200)
    }
    catch (err) {
        // console.log(err)
        res.sendStatus(500);
    }
})

module.exports = router