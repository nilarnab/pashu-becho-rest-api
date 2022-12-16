const express = require("express");
const res = require("express/lib/response");
// middleware = require("../middlewares/auth.js")
const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require("../models/Users");
var path = require("path");
require("dotenv").config();



router.get('/push_location', async (req, res, next) => {

    /*
    Accepts parameters

    1. user_id: (str)
    2. lat: (float)
    3. long: (float)
    4. addr1: (str)
    5. addr2: (str)
    6. city: (str)
    7. pin: (str)

    */

    try {

        // initialization


    }
    catch (err) {

        return res.json(
            {
                verdict: 0,
                err
            }
        )
    }



})

module.exports = router;