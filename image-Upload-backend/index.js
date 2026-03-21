const multer = require("multer")
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const { initializeDatabase} =  require("./models/db.connect")
const{ ImageModel} = require("./models/images")
dotenv.config()
const app = express()
app.use(cors())

app.use(bodyParser.json())
initializeDatabase()

cloudinary.config({
    cloud_name :process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

// multer setup
const storage =  multer.diskStorage({ })
const upload = multer({storage })
app.post("/upload" , upload.single("image") , async(req,res)=>{
    try {
        const file = req.file
        if(!file)  return res.status(400).send("No file upload")
            //upload to cloudinary 
        const result = await cloudinary.uploader.upload(file.path ,{folder : "uploads"})

        //
        const  newImage = new ImageModel({ imageUrl : result.secure_url})
        await newImage.save()
        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl:result.secure_url
        })
        
    } catch (error) {
        res.status(500).json({ message : "Image upload failed" , error: error?.message})
        
    }
})


app.get("/images", async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch images",
      error: error
    });
  }
});



const PORT =4000
app.listen(PORT , ()=>{
    console.log(`server is listining on port ${PORT}`)
})