const { Int32 } = require('mongodb')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')
var crypto = require('crypto'); 

const UsersSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_verified: {
        type: Number,
        default: 0
    },
    mail_verified: {
        type: Number,
        default: 0
    },
    enabled: 
    {
        type: Number,
        default: 1
    },
    is_influencer:
    {
        type: Number,
        default: 0
    },
    is_admin:
    {
        type: Number,
        default: 0
    },

})

// Method to set salt and hash the password for a user 
UsersSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.password = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 
     
   // Method to check the entered password is correct or not 
   UsersSchema.methods.validPassword = function(password) { 
       var hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, `sha512`).toString(`hex`); 
       return this.hash === hash; 
   }; 

module.exports = mongoose.model('Users', UsersSchema)


