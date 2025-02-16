// Import required dependencies
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import "dotenv/config";
import { config } from "dotenv";
import { Notice, Photo } from "./db/models";
import { deletePhoto, uploadPhoto } from "./utils";
import cors  from "cors";
import authenticate from "./utils/authMiddleware";

config();

const app = express();
app.use(cors())
app.use(express.json())


const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect(process.env.MONGODB_URI || "");

app.post("/api/photos", authenticate,upload.single("photo"), async (req, res) => {
  try {

    const photos = await Photo.find({})

    if(photos.length>=10){
      res.status(400).json({
        msg:"cant upload more than 10 photos"
      })
      return 
    }

    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const {url,name} = await uploadPhoto(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`
    );

    // Save photo URL to MongoDB
    const savedPhoto = await Photo.create({ url,name });

    // Return saved photo data
    res.status(201).json(savedPhoto);
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).send(error);
  }
});

app.get("/api/getphotos", async (req, res) => {
  try {
    // Fetch all photos from database
    const photos = await Photo.find({});

    if (!photos.length) {
      res.status(404).send("No photos found");
      return;
    }

    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).send(error);
  }
});



app.delete("/api/deletephoto",authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ success: false })
    return
    };

    await deletePhoto(name); // Uncommented file deletion
    const result = await Photo.deleteOne({ name });

    if (result.deletedCount === 0) {
      res.status(404).json({ success: false });
    return
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.post("/api/notice",authenticate, async (req, res) => {
  try {
    const { title, desc, link } = req.body;

    const response = await Notice.create({
      title,
      desc,
      link,
    });

    res.status(200).json({
      msg: "created",
      body: response,
    });
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

app.get("/api/notices",async(req,res)=>{
try{

  const response = await Notice.find({})

  res.status(200).json({
    response
  })

}catch(err){
  res.status(400).json({
    msg:err
  })
}

})

app.delete("/api/noticedelete",authenticate,async(req,res)=>{
  try{
    const {_id}=req.body

    const response = await Notice.deleteOne({_id})
    res.status(200).json({
      msg:"delete successfull",
      body:response
    })
    return

  }catch(err){

    res.status(400).json({
      msg:err
    })
    return

  }

  

})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
