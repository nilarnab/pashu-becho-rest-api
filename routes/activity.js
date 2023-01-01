const express = require("express");
const router = express.Router();
const Activity="../models/Activity";

app.get("/addActivity/:userID",async(req,res)=>{
    let userID=req.param.userID;
    let action=req.query.action;
    let pid=req.query.pid;
    // let sid=req.query.sid;

    if(!userID || !action || !pid ){
        return res.sendStatus(403);
    }
    else{
        try{
            await (new Activity({action:action,productID:pid,timestamp:Date.now(),userID:userID})).save();
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }


})


module.exports = router;