// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post("/eventphotos", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     res.status(400).json({ error: "No file uploaded" });
//     return;
//   }

//   const imageBuffer = req.file.buffer;
//   const imageName = req.file.originalname;
//   const imageMimeType = req.file.mimetype;

//   console.log("Image Name:", imageName);
//   console.log("Image MIME Type:", imageMimeType);
//   console.log("Image Size (bytes):", req.file.size);

//   res.status(200).json({ message: "File uploaded successfully" });
// });
