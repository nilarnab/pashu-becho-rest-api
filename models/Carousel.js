let mongoose = require('mongoose');
let Schema = mongoose.Schema;

CarouselSchema = new Schema( {
	title:{
		 type: String,
		 require:true
	},
	body:{
		type:String,
		required:true

	},
	image:String,
	
	
},
{
	collection:CarouselData
}),
Carousel = mongoose.model('Carousel', CarouselSchema);

module.exports = Carousel;