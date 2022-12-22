const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
const Resource=require('../models/Resource');
var path = require('path');
const { resourceUsage } = require('process');
require('dotenv').config();


// for streaming service

router.get('/get_video', async (req, res, next) => {
    const id = req.query.id;
    console.log(process.env.UPLOADS_VID_HIGH)
    console.log(path.resolve(__dirname + "/../"))
    return res.sendFile(process.env.UPLOADS_VID_HIGH + "batman_dark_knight_trailer.mp4", { root: path.resolve(__dirname + "/../") })

})

router.get('/getResources',async (req,res)=>{
    let id =req.query.pid;
    if(!id){
        return res.sendStatus(403);
    }
    try{
        const resources=await Resource.find({productID:id});
        res.send(resources);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})


module.exports = router