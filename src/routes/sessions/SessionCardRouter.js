const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../../controller/sessions/SessionCardController")
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const sessionCardRouter = express.Router()

sessionCardRouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
sessionCardRouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
sessionCardRouter.put("/:id",authenticateToken, authorizeRoles('admin'), handleUpdateUserById);
sessionCardRouter.delete("/:id",authenticateToken, authorizeRoles('admin'), handleDeleteUserById);


module.exports = sessionCardRouter