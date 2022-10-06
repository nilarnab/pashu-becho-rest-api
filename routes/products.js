// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Products");

// router.get("/products/:page", async (req, res, next) => {
//   try {
//     const page = req.query.page * 1 || 1;
//     const limit = 12;
//     const skip = (page - 1) * limit;

//     var query = await Product.find();

//     query = query.skip(skip).limit(limit);

//     if (req.query.page) {
//       const numTours = await Product.countDocuments();
//       if (skip >= numTours) {
//         return res.status(400).json({
//           message: "Page does not exist !",
//         });
//       }
//     }
//     return res.status(200).json({
//       message: "Success",
//       query,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: "Something went wrong !",
//     });
//   }
// });
