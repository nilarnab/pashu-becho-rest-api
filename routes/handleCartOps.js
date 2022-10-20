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


router.post("/show_items", async (req, res, next) => {
    /*
    Accepts parameters

    1. user_id: (str)

    show all the cart items of a user id
    
    */

    var response = {}
    console.log("entered route")

    if (req.query.user_id) {
        console.log("user id present")
        var cart_items = await Carts.find({ user_id: req.query.user_id, valid: 1 })
        console.log("foudn some items")
        response["cart_items"] = []
        for (i = 0; i < cart_items.length; i++) {
            var product = await Products.findById(cart_items[i]["prod_id"])

            console.log("making items")
            var prod_obj = {}
            prod_obj[cart_items[i]["prod_id"]] = product
            prod_obj["qnt"] = cart_items[i]["qnt"]
            response["cart_items"].push(prod_obj)
        }

        // cart_items.forEach(async (data, i) => {
        //     cart_items[i]["product"] = await Product.findById(req.query.user_id)
        // })

        console.log("returning items")
        return res.json(
            {
                verdict: 1,
                response
            }
        )


    }
    else {
        return res.json({
            verdict: 0,
            message: "Invalid fields",
            data: null
        })
    }



})

router.post("/insert", async (req, res, next) => {

    /*
    Accepts parameters

    1. user_id: (str)
    2. prod_id: (str)
    3. qnt: (int)

    inserts a new entry in the Carts for a user
    
    */

    if (req.query.user_id && req.query.prod_id && req.query.qnt) {
        var new_cart = new Carts()

        new_cart.user_id = req.query.user_id
        new_cart.prod_id = req.query.prod_id
        new_cart.qnt = req.query.qnt

        var response = await new_cart.save()

        return res.json({
            verdict: 1,
            message: "Success in insertion",
            response: response
        })
    }
    else {
        return res.json({
            verdict: 0,
            message: "Invalid fields",
            data: null
        })
    }

})

router.post("/alter", async (req, res, next) => {
    /*
    Accepts parameters

    1. cart_id: (str)
    3. qnt_new: (int)

    changes the qnt value of a cart item
    
    */

    if (req.query.cart_id && req.query.qnt_new) {

        var cart_ids = await Carts.find({ _id: req.query.cart_id })
        console.log(cart_ids);
        try {
            if (cart_ids.length == 0) {
                return req.json({
                    verdict: 0,
                    message: "No such Cart item exists",
                    data: null
                })
            }
        }
        catch (err) {
            console.log(err);
        }
        var response = await Carts.findByIdAndUpdate(req.query.cart_id, { qnt: req.query.qnt_new })

        return res.json({
            verdict: 1,
            message: "Success in changing quantity",
            data: response
        })
    }
    else {
        return res.json({
            verdict: 0,
            message: "Invalid fields",
            data: null
        })
    }



})

router.post("/purge", async (req, res, next) => {

    if (req.query.cart_id) {
        var cart_ids = await Carts.findById(req.query.cart_id)

        if (cart_ids.length == 0) {
            return req.json({
                verdict: 0,
                message: "No such Cart item exists",
                data: null
            })
        }

        var response = await Carts.findByIdAndUpdate(req.query.cart_id, { valid: 1 })

        return res.json({
            verdict: 1,
            message: "Success in purge",
            data: response
        })

    }
    else {
        return res.json({
            verdict: 0,
            message: "Invalid fields",
            data: null
        })
    }

})


module.exports = router