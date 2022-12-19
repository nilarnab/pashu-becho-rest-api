
const express= require('express');
const path=require("path");
const multer= require('multer');
const Carousels =require('../models/Carousel');


const uploadPath = path.join("public", 'Carousels.ImagePath');
const router =express.Router();
const storageImage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
      }
});
const upload=multer({ storage: storageImage }).single("img");


const addCarousel = async (req, res) => {
    
    if (!req.file) {
        return res.status(422).json({ message: 'Please add an image!' });
    }
    
        const filename = req.file != null ? req.file.filename : null;
        const newcardImage = new Carousels({
            title: req.body.title,
            bodies: req.body.bodies,
            img:filename 
        });
        await newcardImage.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Image Posted",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
};

router.route
("/uploadCarousel")
.post(upload,
    addCarousel
    );
    router.route("/getAllImages").get( async (req, res, next) => {
      console.log("getting found");
      try {
        const data = await Carousels.find();
        console.log(data);
        res.status(200).send(data);
      } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Recovery failed!" });
      }
    });
      
router.get("/getCarousels",async(req,res)=>{
  try{    
    const data=await Carousels.find({});
    res.send(data);
  }
  catch(err){
    console.log(err);
    res.sendStatus(500);
  }
})

      module.exports=router;