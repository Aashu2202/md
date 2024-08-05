const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../../controller/users/UsersController");
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const userrouter = express.Router();

userrouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
userrouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
userrouter.put("/:_id",authenticateToken, authorizeRoles('admin'), handleUpdateUserById);
userrouter.delete("/:id",authenticateToken, authorizeRoles('admin'), handleDeleteUserById);

module.exports = userrouter;
