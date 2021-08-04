"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
// User api
router.post("/signup", users_1.signup);
router.post("/signin", users_1.signin);
router.get("/profile", verifyToken_1.TokenValidate, users_1.profile);
exports.default = router;
