const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Categories =require('../models/Categories');
var path = require('path');
require('dotenv').config();


// for streaming service

router.get('/getCategories', async (req, res, next) => {
  let type=req.query.type;
  console.log("type : ",type);
  if(type==0){
  try{
    const categories=await Categories.find({type:0});
    res.send(categories);
}
catch(err){
    console.log(err);
    res.sendStatus(500);
}}
else if(type==1){
  try{
    const categories=await Categories.find({type:1});
    res.send(categories);
}
catch(err){
    console.log(err);
    res.sendStatus(500);
}}
}
)


module.exports = router