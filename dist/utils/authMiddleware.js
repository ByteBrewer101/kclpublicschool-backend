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
Object.defineProperty(exports, "__esModule", { value: true });
const models_js_1 = require("../db/models.js");
//@ts-expect-error
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // next()
    try {
        // Get credentials from request headers
        const username = req.headers["x-username"];
        const password1 = req.headers["x-password1"];
        const password2 = req.headers["x-password2"];
        // Check if all credentials are provided
        if (!username || !password1 || !password2) {
            return res.status(401).json({
                error: "Authentication failed: Missing credentials",
            });
        }
        // Find credentials in database
        const validCredentials = yield models_js_1.Credential.findOne({ username });
        if (!validCredentials) {
            return res.status(401).json({
                error: "Authentication failed: Invalid username",
            });
        }
        // Validate passwords
        if (password1 !== validCredentials.password1 ||
            password2 !== validCredentials.password2) {
            return res.status(401).json({
                error: "Authentication failed: Invalid passwords",
            });
        }
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            error: "Internal server error during authentication",
        });
    }
});
exports.default = authenticate;
