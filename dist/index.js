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
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./db/models");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield mongoose_1.default.connect("mongodb://localhost:27017/kclschooldb");
        if (response) {
            console.log("mongo connected");
        }
    });
}
main();
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, link } = req.body;
        const response = yield models_1.NoticeModel.create({
            title,
            desc,
            link,
        });
        res.status(200).json({
            msg: "notice added successfully",
            body: response
        });
        return;
    }
    catch (err) {
        res.status(400).json({
            err,
        });
        return;
    }
}));
app.listen(5000, () => {
    console.log("running on 5000");
});
