const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  milk: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: [String],
  price: {
    type: Number,
    required: true,
  },
  quantity: Number,
  image1: { type: String, default: "https://picsum.photos/200/300" },
  video:{type:String,default:"http://159.223.90.95:5000/video/id_video_1/_manifest.mpd"},
  image2: { type: String, default: "https://picsum.photos/200/300" },
  location:{lat:String,long:String,address:String},
  postTime:{type:Date,default:Date.now()},
  contactPerson:String,
});

module.exports = mongoose.model('Products', productSchema)
