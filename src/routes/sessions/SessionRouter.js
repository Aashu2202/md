const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../../controller/sessions/SessionController")
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const sessionRouter = express.Router()

sessionRouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
sessionRouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
sessionRouter.put("/:_id",authenticateToken, authorizeRoles('admin'), handleUpdateUserById);
sessionRouter.delete("/:id",authenticateToken, authorizeRoles('admin'), handleDeleteUserById);


module.exports = sessionRouter