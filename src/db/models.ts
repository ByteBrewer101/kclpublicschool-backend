import mongoose from "mongoose";


const NoticeSchema = new mongoose.Schema({
    title:String,
    desc:String,
    link:String
})



export const NoticeModel = mongoose.model("NoticeModel",NoticeSchema)


