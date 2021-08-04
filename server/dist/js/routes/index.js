"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const users_1 = require("../controllers/users");
const router = express_1.Router();
// Todo api
router.get("/todos", todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
router.put("/edit-todo/:id", todos_1.updateTodo);
router.delete("/delete-todo/:id", todos_1.deleteTodo);
// User api
router.post("/signup", users_1.signup);
router.post("/signin", users_1.signin);
router.get("/profile", users_1.profile);
exports.default = router;
