const express = require('express');
const res = require('express/lib/response');
// middleware = require("../middlewares/auth.js")
const { json } = require('express/lib/response');
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require('../models/Users')
const Searchables = require('../models/Searchables')

var path = require('path');
require('dotenv').config();
const axios = require('axios')


// for streaming service

router.post('/query', async (req, res, next) => {
    
    var query = req.query.query
    console.log(query)
    var response = await axios(
        {
            method: 'get',
            url: 'https://search-buybold-pn5pbomaygf7rlsx6jk5vkxicm.ap-southeast-1.es.amazonaws.com/products/_search?q=' + query + '&pretty=true',
            auth: {
                username: 'buyBold_auto',
                password: 'BuyBold@auto@1234'
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        
    })

    // response = JSON.stringify(response)

    console.log(response.data)

    return res.json(
        {
            'verdict': 1,
            'data': response.data.hits.hits,
        }
    )
})

router.post('/add', async (req, res, next) => {
    
    /*

        requried fields

        body: product object that is to be added 


    */
   
    var prod_id = req.body._id.$oid
    var timestamp = Date.now()
    
    // req.body._id = prod_id

    delete req.body._id

    console.log(req.body)

    var response = await axios(
        {
            method: 'post',
            url: 'https://search-buybold-pn5pbomaygf7rlsx6jk5vkxicm.ap-southeast-1.es.amazonaws.com/products/_doc/' + timestamp.toString(),
            data: req.body,
            auth: {
                username: 'buyBold_auto',
                password: 'BuyBold@auto@1234'
            },
            Headers: {
                'Content-Type': 'application/json'
            }
        
    })

    console.log("success in insertion in open search")

    // console.log(prod_id)

    await Searchables.insertMany(
        [{
            prod_id: prod_id,
            search_id: timestamp
        }], (err, res) => 
        {
            console.log(err)
            console.log(res)
        }
    )
    console.log("inserted in local database")
    
    return res.json(
        {
            verdict: 1
        }
    )

})


module.exports = router