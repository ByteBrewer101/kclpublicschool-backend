import mongoose, { mongo } from "mongoose";

const noticeSchema = new mongoose.Schema({
  title:String,
  desc:String,
  link:String
})



const photoSchema = new mongoose.Schema({
  url: String,
  name:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Photo = mongoose.model("Photo", photoSchema);
export const Notice = mongoose.model("Notice",noticeSchema)

