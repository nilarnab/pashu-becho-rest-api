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
const axios = require('axios');
const Products = require('../models/Product');
const { send } = require('process');

const { MeiliSearch } = require('meilisearch');
const Product = require('../models/Product');
var client;
try {
 client = new MeiliSearch({ host: 'http://localhost:7700',apiKey: 'aajmereyaarkishaadihai' })
 client.index('products').addDocuments({})
 .then((res) => console.log(res));
}
catch(err){
    console.log(err);
}
// router.get("/addAll",async(req,res)=>{
//    try{
//     const products = await Product.find({});
//    products.forEach(el=>{
//        client.index('products').addDocuments(el)
//        .then((res) => console.log(res));
//    }) 
//    res.sendStatus(200);
// }
// catch(err){
//     console.log(err)
//     res.sendStatus(500);
// }

// })

router.get("/query",async(req,res)=>{
    const q=req.query.query;
    try{
    client.index('products').search(q).then((result) => res.send({'verdict': 1,'data': result.hits,}));
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
// // for streaming service

// router.post('/query', async (req, res, next) => {

//     console.log("got for query")
//     console.log(req.query)

//     if (req.query.query == '') {
//         return res.json(
//             {
//                 'verdict': 1,
//                 'data': await Products.find({}),
//             }
//         )
//     }


//     var sendable = []

//     var query = req.query.query
//     console.log(query)
//     var response = await axios(
//         {
//             method: 'get',
//             url: 'https://search-buybold-pn5pbomaygf7rlsx6jk5vkxicm.ap-southeast-1.es.amazonaws.com/products/_search?q=' + query + '&pretty=true',
//             auth: {
//                 username: 'buyBold_auto',
//                 password: 'BuyBold@auto@1234'
//             },
//             Headers: {
//                 'Content-Type': 'application/json'
//             }

//         })

//     // response = JSON.stringify(response)

//     // console.log(response.data.hits.hits)

//     var count = 0;

//     response.data.hits.hits.forEach(async (pred, index) => {


//         // console.log(pred)

//         var pred_id = pred._id
//         console.log(pred_id)

//         var prediction = await Searchables.find({ search_id: pred_id })
//         console.log(prediction[0].prod_id)
//         var prod = await Products.findById(prediction[0].prod_id)

//         // console.log(prod)

//         count += 1

//         sendable.push(prod)


//         if (sendable.length == response.data.hits.hits.length) {
//             console.log(sendable)

//             return res.json(
//                 {
//                     'verdict': 1,
//                     'data': sendable,
//                 }
//             )
//         }


//     });



// })


// router.post('/purge', async (req, res, next) => {


//     var searchables = await Searchables.find({})

//     searchables.forEach(async (searchable, index) => {
//         console.log(searchable.search_id)

//         try {
//             var response = await axios(
//                 {
//                     method: 'delete',
//                     url: 'https://search-buybold-pn5pbomaygf7rlsx6jk5vkxicm.ap-southeast-1.es.amazonaws.com/products/_doc/' + searchable.search_id,
//                     auth: {
//                         username: 'buyBold_auto',
//                         password: 'BuyBold@auto@1234'
//                     },
//                     Headers: {
//                         'Content-Type': 'application/json'
//                     }

//                 })

//         }
//         catch (error) {
//             console.log("could not find")
//         }

//         // console.log(response)

//     })


// })

// router.post('/add', async (req, res, next) => {

//     /*
//         requried fields
//         body: product object that is to be added 
//     */
//     console.log(req.body)

//     var prod_id = req.body._id.$oid
//     var timestamp = Date.now()

//     // req.body._id = prod_id

//     delete req.body._id

//     console.log(req.body)

//     var response = await axios(
//         {
//             method: 'post',
//             url: 'https://search-buybold-pn5pbomaygf7rlsx6jk5vkxicm.ap-southeast-1.es.amazonaws.com/products/_doc/' + timestamp.toString(),
//             data: req.body,
//             auth: {
//                 username: 'buyBold_auto',
//                 password: 'BuyBold@auto@1234'
//             },
//             Headers: {
//                 'Content-Type': 'application/json'
//             }

//         })

//     console.log("success in insertion in open search")

//     console.log(prod_id)

//     await Searchables.insertMany(
//         [{
//             prod_id: prod_id,
//             search_id: timestamp
//         }], (err, res) => {
//         console.log(err)
//         console.log(res)
//     }
//     )
//     console.log("inserted in local database")

//     return res.json(
//         {
//             verdict: 1
//         }
//     )

// })
router.post('/add', async (req, res, next) => {

    /*
        requried fields
        body: product object that is to be added 
    */
    console.log(req.body)

    var prod_id = req.body._id.$oid
    var timestamp = Date.now()

    // req.body._id = prod_id

    // delete req.body._id

    console.log(req.body)

    try{
        client.index('products').addDocuments(req.body)
        .then((res) => console.log(res));
       console.log("success in insertion in open search")
       console.log(prod_id);

       Searchables.insertMany(
           [{
               prod_id: prod_id,
               search_id: timestamp
           }], (err, res) => {
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
    }
    catch(err){
        console.log(err)
        res.sendStatus(500);
    }
})


module.exports = router