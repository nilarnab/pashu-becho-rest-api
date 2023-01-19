const express = require("express");
const res = require("express/lib/response");
const session = require("express-session");
const path = require('path');
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
  // console.log(req.query);
  res.send("Pre login");
});
app.get("/searchItem", async (req, res) => {
  let text = req.query.text;
  if (text) {
    const products = (await Product.find({}));
    // console.log(products)
    res.json({ mydata: products })
  }
  else {
    res.status(403).send("Enter search text as query");
  }
})
app.use(express.static(__dirname + "public")); //Serves resources from public folder
app.use("/images", express.static(__dirname + "/public/CarouselImages"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage });
app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.fields([{name:"photo",maxCount:3},{name:"video",maxCount:1}]), (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: 'success!',
  });
});

















const authRouter = require('./routes/auth.js');
const streamRouter = require('./routes/stream.js');
const phoneVerfiyRouter = require('./routes/phoneVerify');
const PushNotification = require('./routes/push_notification')
const handleCartOps = require('./routes/handleCartOps');
const productRouter = require("./routes/products.js");
const searchRouter = require("./routes/search.js");
const sessionRouter = require("./routes/handleSession")
const userInfoRouter = require("./routes/userInfo")
const carouselRouter = require('./routes/carousel_img')
const monitorRouter = require('./routes/monitor_test')
const categoryDefine = require('./routes/categoryDefine')
const ordeRouter = require('./routes/order_manage')
const activityRouter = require('./routes/activity')
const payment = require('./routes/payment_handler');
const wishlist_handle = require('./routes/wishlist_handler')
const show_trending = require('./routes/show_trendings')



app.use("/activity", activityRouter)
app.use("/carousel", carouselRouter)
app.use("/categoryDefine", categoryDefine)
app.use("/auth", authRouter)
app.use("/pushnot", PushNotification)
app.use('/stream', streamRouter)
app.use("/phoneVerify", phoneVerfiyRouter)
app.use("/handleCartOps", handleCartOps)
app.use("/products", productRouter);
app.use("/wishlist", wishlist_handle);
app.use("/search", searchRouter);
app.use("/sessionManage", sessionRouter)
app.use("/userInfo", userInfoRouter)
app.use("/monitor", monitorRouter)
app.use("/orderManage", ordeRouter)
app.use("/razorpay", payment);
app.use("/trending", show_trending)


const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app is listening at ${port}`)


