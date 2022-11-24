const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageId: String,
    imagePath: String
},
{
    collection:CarouselImages
});
module.exports = mongoose.model('Image', ImageSchema);