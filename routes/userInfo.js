const express = require("express");
const Activity = require("../models/Activity");
const Product = require("../models/Product");
const router = express.Router();
const Sessions = require("../models/Sessions");
const Users = require("../models/Users");


async function is_session_alive(uuid, user_id) {
    var sessions = await Sessions.find({ uuid: uuid, user_id: user_id, alive: 1 })

    if (sessions.length) {
        return true
    }
    else {
        return false
    }
}

router.post('/update_name', async (req, res, next) => {

    // console.log(req.query)
    // updates the name of the user 

    // initialization
    var uuid = req.query.uuid
    var user_id = req.query.user_id
    var name = req.query.name

    // checking if session is alive
    var session_life = await is_session_alive(uuid, user_id)

    // updating name in the database
    //------------------------------------------
    if (session_life) {
        var response = await Users.findByIdAndUpdate(user_id, { name: name })

        return res.json({
            verdict: 1,
            response,
            message: 'name change to ' + name
        })
    }
    else {
        return res.json({
            verdict: 0,
            message: 'session is not alive'
        })
    }
    //----------------------------------------


})

router.post('/get_by_phone', async (req, res, next) => {

    if (req.query.phone_num) {
        var phone = req.query.phone_num
        var user = await Users.find({ phone: phone })

        res.json(
            {
                verdict: 1,
                user
            }
        )
    }

    else {
        res.json({
            verdict: 0,
            message: "Invalid fields"
        })
    }
})

router.get("/fetchVisited",async(req,res)=>{
    let uid=req.query.uid;
    console.log(uid);
    if(!uid){
        return res.sendStatus(403);
    }
    ans=[]
    const data=await Activity.find({userID:uid,action:"browsed"},{productID:1,_id:0}).sort({timestamp:-1}).limit(5);
    for(var i=0;i<data.length;i++){
        data[i]=data[i].productID;
    }
    // console.log("data",data)
    const fetch=async(data)=>{
        const ans=[]
        data.map(async(id,index)=>{
            let el=await Product.findById(id,{image:1})
            if(index==4){
                ans.push(el);
                // console.log(ans);
                res.json(ans);
            }
            else{
                ans.push(el)
            }
        })
    }
    try{
    fetch(data);
    }
    catch(err){
        res.sendStatus(500);
        console.log(err);
    }
    // let prod=await Product.find({_id:{$in:data}},{image:1})    
    // console.log(prod);
    
})



module.exports = router;
