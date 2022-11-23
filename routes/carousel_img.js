const { Router } = require('express');
const express= require('express');
const { body } = require('express-validator');
const multer= require('multer');
const Carousel =require('../models/Carousel');
const Image = require('../models/Carouselimg');
const router =express.Router();
const fs= require('fs');


const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploaded/Carouselimages/');
    },
    filename: (req, file, cb) => {
        const fname = `image_${(new Date).getTime()}.${file.mimetype.replace('image/', '')}`
        cb(null, fname);
        req.fname = 'Carouselimages/' + fname;
    }
});
const carouselImage=multer({ storage: storageImage }).single("image");


const addCarousel = async (req, res, next) => {
    // const errorMessage = validatorFunctions.validators(req, res);
    // console.log('Retrieved errorMessage', errorMessage);
    // if (errorMessage) {
    //     return res.status(422).json({ message: 'Validation error', error: errorMessage });
    // }
    if (!req.file) {
        return res.status(422).json({ message: 'Please add an image!' });
    }
    try {
        newcardImage = await Image({ imagePath: req.fname }).save()
        const newcardImage = new Carousel({
            name: req.body.name,
            body: req.body.body,
            image: newImage._id,
        })
        await newcardImage.save();
        next();
    }
    catch (error) {
        console.log(error);

    }
}

router.route
('uploadCarousel')
.post(carouselImage,
    addCarousel,
    async (req,res)=>{
        const imagePath = req.fname;
        const Imagepath = fs.readFileSync(imagePath);
        res.status(200).send("Images Added Successfully");
        try{
            const uploadedImage = new carouselImage({
                Key: req.file.filename,
                body: Imagepath,
            }).promise()
            
            fs.unlinkS  
            await uploadedImage.save();
        }
        catch (err) {
            console.log("Uploding to database Failed", err);
        }
    
    });
    router.route("/getAllImages").get( async (req, res, next) => {
        try {
          const allImages = await Carousel.find();
          res.status(200).json({
            status: "Success",
            allImages,
          });
        } catch (err) {
          return res.status(400).json({
            status: "Error",
            message: "Something went wrong !",
          });
        }
      });

      module.exports=router;