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

const sch = {
    name: String,
    price: Number,
    description: String,
    quantity: Number,
    size: String,
    brand: String

};

const monmodel = mongoose.model("NEWCOL", sch);

router.post("/insert", async (req, res) => {
    console.log("inside post function");
    const data = new monmodel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        size: req.body.size,
        brand: req.body.brand
    });

    const val = await data.save();
    res.send("posted");
});

router.delete("/delete/:name", async (req, res) => {
    console.log("inside delete function");

    let delname = req.params.name;
    monmodel.findOneAndDelete({ name: delname }, function (err, docs) {
        res.send("deleted successfully!");
    })
});

router.put("/update/:name", async (req, res) => {
    console.log("inside update function");

    let upname = req.params.name;
    let upprice = req.body.price;
    let updescription = req.body.description;
    let upquantity = req.body.quantity;
    let upsize = req.body.size;
    let upbrand = req.body.brand;

    monmodel.findOneAndUpdate({ name: upname }, { $set: { price: upprice, description: updescription, quantity: upquantity, size: upsize, brand: upbrand } },
        { new: true }, (err, data) => {
            if (data == null) {
                res.send("nothing found");
            }
            else {
                res.send("updated successfully!");
            }
        });

});
// router.post("/alter", async (req, res, next) => {


// })