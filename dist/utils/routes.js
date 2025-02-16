"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../db/models");
const multer_1 = require("./multer");
const imageRouter = express_1.default.Router();
// Upload image with description
imageRouter.post("/", multer_1.singleImageUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No image provided" });
            return;
        }
        const gallery = new models_1.GalleryModel({
            description: req.body.description,
            image: req.file.buffer,
            contentType: req.file.mimetype,
        });
        yield gallery.save();
        res.status(201).json({
            message: "Image uploaded successfully",
            id: gallery._id,
            description: gallery.description,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
imageRouter.post("/getimage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gallery = yield models_1.GalleryModel.find({});
        // if (!gallery || !gallery.image) {
        //   res.status(404).json({ error: "Image not found" });
        //   return;
        // }
        gallery.map((i) => {
            res.set({
                "Content-Type": i.contentType,
                "X-Image-Description": i.description,
                "Content-Length": i.image.length,
            });
            res.end(i.image);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
exports.default = imageRouter;
