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
var path = require('path');
const { randomFillSync } = require('crypto');
require('dotenv').config();


router.post("/askOtp", async (req, res, next) => {
})
 

module.exports = router