import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import { NoticeModel } from "./db/models";

const app = express();

app.use(express.json());

async function main() {
  const response = await mongoose.connect(
    "mongodb://localhost:27017/kclschooldb"
  );
  if (response) {
    console.log("mongo connected");
  }
}
main();

app.post("/post", async (req, res) => {
  try {
    const { title, desc, link } = req.body;

    const response = await NoticeModel.create({
      title,
      desc,
      link,
    });

    res.status(200).json({
      msg: "notice added successfully",
      body:response
    });
    return;
  } catch (err) {
    res.status(400).json({
      err,
    });
    return
  }
});









app.listen(5000, () => {
  console.log("running on 5000");
});
