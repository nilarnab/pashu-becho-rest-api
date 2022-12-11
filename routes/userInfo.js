const express = require("express");
const router = express.Router();
const Sessions = require("../models/Sessions");
const Users = require("../models/Users");


router.post('/get_by_phone', async (req, res, next) => {
    
    if (req.query.phone_num)
    {    
        var phone = req.query.phone_num
        var user = await Users.find({phone: phone})

        res.json(
            {
                verdict: 1,
                user
            }
        )
    }

    else
    {
        res.json({
            verdict: 0,
            message: "Invalid fields"
        })
    }
})



module.exports = router;
