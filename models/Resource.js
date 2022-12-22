const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
    type:String,
    productID:String,
    active:Boolean,
    // url:{type:String,default:function(){ if(this.type==="image"){
    //     return 'https://'
    // }
    // else if(this.type=="video"){
    //     return 'https://'
    // }
    // else{
    //     return ''
    // } }}
});

ResourceSchema.virtual('url').get(function(){
    if(this.type==="image"){
        return 'https://'
    }
    else if(this.type=="video"){
        return 'https://'
    }
    else{
        return ''
    }
})
module.exports = mongoose.model('Resource', ResourceSchema)
