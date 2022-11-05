const express = require("express");
const router = express.Router();
const Sessions = require("../models/Sessions");
const Users = require("../models/Users");

router.post('/create', async (req, res, next) => {

    console.log('create sessions')
    /*
        user_id: String 

    */


    if (req.query.user_id)
    {
        var user_id = req.query.user_id
        var timestamp = Date.now()

        const date = new Date(timestamp)
        var month = date.getMonth()+1
        const timestamp_human = date.getFullYear() + ':' 
        + month + ':'
        + date.getDate() + '::'
        + date.getHours() + ':'
        + date.getMinutes() + ':'
        + date.getSeconds()+':'
        + date.getMilliseconds()

        console.log("timestamp", timestamp_human)

        // find if a session already exists 
        var existing = await Sessions.find({ user_id: user_id, alive: true})

        if (existing.length == 0)
        {
            // creating a new session
            var response = await Sessions.insertMany([
                {
                    user_id: user_id,
                    timestamp: timestamp,
                    timestamp_human: timestamp_human
                }
            ])

            return res.json({
                verdict: 1,
                message: "Success in adding a new session",
                response
            })
        }
        else
        {
            return res.json({
                verdict: 1,
                message: 'Session already exists'
            })
        }

    }
    else
    {
        res.json(
            {
                verdict: 0,
                message: "invalid fields"
            }
        )
    }
    return res.json(
        {
            verdict: 1
        }
    )


})


router.post('/is_alive', async (req, res, next) => {

    if (req.query.user_id)
    {

        var user_id = req.query.user_id

        // checking if exists in sessions
        var alives = await Sessions.find({user_id: user_id, alive: true})

        if (alives.length == 0)
        {
            res.json(
                {
                    verdict: 0,
                    message: "No valid session"
                }
            )
        }
        else
        {
            var response = await Users.findById(user_id)
            res.json(
                {
                    verdict: 1,
                    message: "Session exists",
                    response
                }
            )
        }

    }
    else
    {
        res.json(
            {
                verdict: 0,
                message: "invalid fields"
            }
        )
    }
})

router.post('/destroy', async (req, res, next) => {

    console.log("reached endpoint")
    if (req.query.user_id)
    {

       var user_id = req.query.user_id
       
       var response = await Sessions.deleteMany({
           user_id: user_id
       })

       res.json({
           verdict: 1,
           message: "Deletion complete",
           response
       })

    }
    else
    {
        res.json(
            {
                verdict: 0,
                message: "invalid fields"
            }
        )
    }
})



module.exports = router;
