const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
var path = require('path');
require('dotenv').config();


// for streaming service

router.get('/get_video', async (req, res, next) => {
    console.log(process.env.UPLOADS_VID_HIGH)
    console.log(path.resolve(__dirname + "/../"))
    return res.sendFile(process.env.UPLOADS_VID_HIGH + "batman_dark_knight_trailer.mp4", { root: path.resolve(__dirname + "/../") })

})


module.exports = router