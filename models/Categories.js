let mongoose = require('mongoose');
let Schema = mongoose.Schema;

categoriesSchema = new Schema( {
	_id:Schema.ObjectId,
	
	title:{
		 type: String,
		 require:true
	},
	action:{
		type:String,
		required:true

	},
	subcategory:[{
		title:String,
		action:String,
		image:String
	}]
	
}),
Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;