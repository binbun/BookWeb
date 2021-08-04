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
exports.profile = exports.signup = exports.signin = void 0;
const user_1 = __importDefault(require("../../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json('Email or password is wrong');
        }
        const correctPassword = yield user.validatePassword(req.body.password);
        if (!correctPassword) {
            return res.status(400).json('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'bin', {
            expiresIn: 60 * 60 * 2
        });
        res.header('auth-token', token).json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // saving a new user
        const newUser = new user_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = yield newUser.encryptPassword(newUser.password);
        const savedUser = yield newUser.save();
        // token
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "bin");
        res.header('auth-token', token).json(savedUser);
    }
    catch (error) {
        throw error;
    }
});
exports.signup = signup;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            return res.status(400).json('No user found');
        }
        res.json(user);
    }
    catch (error) {
        throw error;
    }
});
exports.profile = profile;
