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
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
  },
  quantity: Number,
  image: String,
  reviews: String,
  userId: Number,
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
