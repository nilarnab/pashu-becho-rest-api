const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
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
  ratings: {
    type: Number,
  },
  quantity: Number,
  image: {type:String,default:"https://picsum.photos/200/300"},
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
    },
  },
});

module.exports = mongoose.model('Products', productSchema)
