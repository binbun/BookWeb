"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidate = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(400).json('Access denied');
    }
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'bin');
    req.userId = payload._id;
    console.log(payload);
    next();
};
exports.TokenValidate = TokenValidate;
