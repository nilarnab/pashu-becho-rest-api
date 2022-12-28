const express = require("express");
const router = express.Router();
const Sessions = require("../models/Sessions");
const Users = require("../models/Users");

const PageEngagements = require("../models/PageEngagements");


router.get('/send_metric', async (req, res, next) => {

    if (req.query.metric == 'PAGE_ENGAGEMENT') {
        var pagename = req.query.pagename;
        var userid = req.query.userid;
        var pagesubname = req.query.pagesubname;

        if (userid && pagename) {
            response = PageEngagements.insertMany({
                pagename: pagename,
                userid: userid,
                pagesubname: pagesubname,
                timestamp: new Date(),
            })
        }

        else {
            return res.json(
                {
                    verdict: 0,
                    message: "Missing parameters"
                }
            )
        }
    }

    else {
        return res.json(
            {
                verdict: 0,
                message: "Invalid metric"
            }
        )
    }


    return res.json(
        {
            verdict: 1,
            message: "Metric OK"
        }
    )


})

module.exports = router;
