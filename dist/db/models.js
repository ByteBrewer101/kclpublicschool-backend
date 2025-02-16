"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NoticeSchema = new mongoose_1.default.Schema({
    title: String,
    desc: String,
    link: String
});
exports.NoticeModel = mongoose_1.default.model("NoticeModel", NoticeSchema);
