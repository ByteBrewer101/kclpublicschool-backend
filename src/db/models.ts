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


const credentialSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password1: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Credential = mongoose.model("Credential", credentialSchema);
export const Photo = mongoose.model("Photo", photoSchema);
export const Notice = mongoose.model("Notice",noticeSchema)

