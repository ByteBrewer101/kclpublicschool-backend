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
// Import required dependencies
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const dotenv_1 = require("dotenv");
const models_1 = require("./db/models");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = __importDefault(require("./utils/authMiddleware"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
mongoose_1.default.connect(process.env.MONGODB_URI || "");
app.post("/api/photos", authMiddleware_1.default, upload.single("photo"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield models_1.Photo.find({});
        if (photos.length >= 10) {
            res.status(400).json({
                msg: "cant upload more than 10 photos"
            });
            return;
        }
        if (!req.file) {
            res.status(400).send("No file uploaded");
            return;
        }
        const { url, name } = yield (0, utils_1.uploadPhoto)(req.file.buffer, `${Date.now()}-${req.file.originalname}`);
        // Save photo URL to MongoDB
        const savedPhoto = yield models_1.Photo.create({ url, name });
        // Return saved photo data
        res.status(201).json(savedPhoto);
    }
    catch (error) {
        console.error("Error uploading photo:", error);
        res.status(500).send(error);
    }
}));
app.get("/api/getphotos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all photos from database
        const photos = yield models_1.Photo.find({});
        if (!photos.length) {
            res.status(404).send("No photos found");
            return;
        }
        res.json(photos);
    }
    catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).send(error);
    }
}));
app.delete("/api/deletephoto", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ success: false });
            return;
        }
        ;
        yield (0, utils_1.deletePhoto)(name); // Uncommented file deletion
        const result = yield models_1.Photo.deleteOne({ name });
        if (result.deletedCount === 0) {
            res.status(404).json({ success: false });
            return;
        }
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
}));
app.post("/api/notice", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, link } = req.body;
        const response = yield models_1.Notice.create({
            title,
            desc,
            link,
        });
        res.status(200).json({
            msg: "created",
            body: response,
        });
    }
    catch (err) {
        res.status(400).json({
            msg: err,
        });
    }
}));
app.get("/api/notices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield models_1.Notice.find({});
        res.status(200).json({
            response
        });
    }
    catch (err) {
        res.status(400).json({
            msg: err
        });
    }
}));
app.delete("/api/noticedelete", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const response = yield models_1.Notice.deleteOne({ _id });
        res.status(200).json({
            msg: "delete successfull",
            body: response
        });
        return;
    }
    catch (err) {
        res.status(400).json({
            msg: err
        });
        return;
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
