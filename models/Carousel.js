let mongoose = require('mongoose');

const path = require("path");
const ImagePath = "CarouselImages";
 const CarouselSchema = new mongoose.Schema({
	title:{
		 type: String,
		 require:true
	},
	bodies:{
		type:String,
		required:true

	},
	img:{
		type:String,
		required:true
	}
});
CarouselSchema.virtual("ImagePath").get(function () {
    return path.join("/", ImagePath, this.img);
  });
  const Carousel = mongoose.model('Carousel', CarouselSchema);
module.exports.ImagePath=ImagePath;
module.exports = Carousel;