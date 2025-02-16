"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = exports.Photo = exports.Credential = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noticeSchema = new mongoose_1.default.Schema({
    title: String,
    desc: String,
    link: String
});
const photoSchema = new mongoose_1.default.Schema({
    url: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const credentialSchema = new mongoose_1.default.Schema({
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
exports.Credential = mongoose_1.default.model("Credential", credentialSchema);
exports.Photo = mongoose_1.default.model("Photo", photoSchema);
exports.Notice = mongoose_1.default.model("Notice", noticeSchema);
