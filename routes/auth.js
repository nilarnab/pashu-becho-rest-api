const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
var path = require('path');
require('dotenv').config();



router.get("/test", async (req, res, next) => 
{
    return res.sendFile(path.resolve("red_lady.jpg"))
})

router.post("/login", async (req, res, next) => 
{
    var user = await Users.find({ email : req.query.email })
    console.log(user)

    if (user.length == 1)
    {
        var verdict = await bcrypt.compare(req.query.password, user[0].password)
        return res.json(
            {
                verdict: verdict,
                message: "Login complete"
            }
        )
    }
    else if (user.length == 0)
    {
        return res.json(
            {
                verdict: 0,
                message: "No such email"
            }
        )
    }
    else
    {
        return res.json(
            {
                verdict: -1,
                message: "ERROR: duplicate mail found " + user.length
            }
        )
    }

    
})


router.post("/register", async (req, res, next) => 
{

    /*
    Register page
    -------------------------------------------
    name (str)
    email (str)
    password (str)
    phone (str)
    ------------------------------------------
    1. Register and add to the database, with phone verified as 0
    2. Adds an entry to phone_tokens and sends an sms
    */
    
    if (req.query.hasOwnProperty('name') && req.query.hasOwnProperty('email') && req.query.hasOwnProperty('password') && req.query.hasOwnProperty('phone'))
    {
        if (check_password(req.query.password) == "")
        {


            if (! await check_email(req.query.email))
            {
                return res.json(
                    {
                        verdict: 0,
                        message: "Email already exists"
                    }
                )
            }
            
            if (! await check_phone(req.query.phone))
            {
                return res.json(
                    {
                        verdict: 0,
                        message: "Phone number already exists"
                    }
                )
            }

            if (req.query.phone.length != 10)
            {
                return res.json(
                    {
                        verdict: 0,
                        message: "The phone number should be 10 of digit"
                    }
                )
            }

            var new_entry = new Users()

            new_entry.name = req.query.name
            new_entry.email = req.query.email
            new_entry.password = await bcrypt.hash(req.query.password, 8)
            new_entry.phone = req.query.phone

            // https://www.loginradius.com/blog/engineering/password-hashing-with-nodejs/

            await new_entry.save();

            return res.json(
                {
                    verdict: 1,
                    message: "Regsitration complete"
                }
            )
        }
        else
        {
            return res.json(
                {
                    verdict: 0,
                    message: "Password length shorter than ".process.env.PASSWORD_LENGTH
                }
            )
        }
    }
    else
    {
        return res.json(
            {
                verdict: 0,
                message: "Not all fields are present"
            }
        )
    }
})



function check_password(password)
{
    if (password.length >= process.env.PASSWORD_LENGTH)
    {
        return "password not longer than ".process.env.PASSWORD_LENGTH
    }
    

    return ""
}


async function check_email(email)
{
    var old_entry = await Users.find({email: email})

    if (old_entry.length > 0)
    {
        return false
    }
    else
    {
        return true
    }
}

async function check_phone(phone)
{
    var old_entry = await Users.find({phone: phone})

    if (old_entry.length > 0)
    {
        return false
    }
    else
    {
        return true
    }
}

async function send_sms(phone)
{

}

module.exports = router
