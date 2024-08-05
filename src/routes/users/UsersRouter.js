const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../../controller/users/UsersController");
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const userrouter = express.Router();

userrouter.get("/", handleGetAllUsers);
userrouter.post("/",  handleCreateUser);
userrouter.put("/:id",  handleUpdateUserById);
userrouter.delete("/:id", handleDeleteUserById);

module.exports = userrouter;


