const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const session = require('express-session');
require('dotenv').config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

const mongo = require('mongoose');
mongo.connect(process.env.DATABASE_URL, { usenewUrlParser: true })
const db = mongo.connection

db.on('error', (error) => { console.error(error) })
db.once('open', () => { console.log("connection complete") })

app.use(express.urlencoded(
    {
        extended: true
    }))

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {

    console.log(req.query)
    res.send("Pre login");
})

const authRouter = require('./routes/auth.js');
const streamRouter = require('./routes/stream.js');
const phoneVerfiyRouter = require('./routes/phoneVerify');
const handleCartOps = require('./routes/handleCartOps');

app.use("/auth", authRouter)
app.use('/stream', streamRouter)
app.use("/phoneVerify", phoneVerfiyRouter)
app.use("/handleCartOps", handleCartOps)

app.listen(process.env.PORT || 3000)

/*

required end points
for each product -> 
add to cart --> what quantity 
{
    id (int)
    qnt (int)
}

will be added to the cart


cart structure
{
    user_id: (str)
    id: (int)
    qnt: (int)
    valid: (int) -> 0 or 1 ()
}
*/