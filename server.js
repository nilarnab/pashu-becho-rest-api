const express = require("express");
const res = require("express/lib/response");
const session = require("express-session");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const mongo = require("mongoose");
mongo.connect(process.env.DATABASE_URL, { usenewUrlParser: true });
const db = mongo.connection;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connection complete");
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

const Product = require("./models/Product")
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  console.log(req.query);
  res.send("Pre login");
});
app.get("/searchItem", async (req, res) => {
  let text = req.query.text;
  if (text) {
    const products = (await Product.find({ tag: { $in: [text] } }));
    console.log(products)
    res.json({ mydata: products })
  }
  else {
    res.status(403).send("Enter search text as query");
  }
})

const authRouter = require('./routes/auth.js');
const streamRouter = require('./routes/stream.js');
const phoneVerfiyRouter = require('./routes/phoneVerify');
const handleCartOps = require('./routes/handleCartOps');
const productRouter = require("./routes/products.js");

app.use("/auth", authRouter)
app.use('/stream', streamRouter)
app.use("/phoneVerify", phoneVerfiyRouter)
app.use("/handleCartOps", handleCartOps)
app.use("/products", productRouter);
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app is listening at ${port}`)
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

