const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
var path = require('path');
require('dotenv').config();

const validator = require('validator')


router.get("/test", async (req, res, next) => {
    return res.sendFile(path.resolve("red_lady.jpg"))
})


router.post("/alter", async (req, res, next) => {


})