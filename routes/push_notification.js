const admin = require('firebase-admin')
const express = require('express')
const router = express.Router();
const app = express();

var serviceAccount = require("../buybold-2efd2-firebase-adminsdk-jjzls-c39a18ccd8.json");
app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


router.post('/send-noti', (req, res) => {
    // console.log(req.body)
    const message = {
        notification: {
            title: " ",
            body: " "
        },
        tokens: req.body.tokens
    }

    admin.messaging().sendMulticast(message).then(res => {
        // console.log('send success')
    }).catch(err => {
        // console.log(err)
    })
})

module.exports = router;