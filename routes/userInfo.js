const express = require("express");
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

    console.log(req.query)
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



module.exports = router;
