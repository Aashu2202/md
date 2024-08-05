const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../../controller/core_data/TrainingModuleController")
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const trainingModuleRouter = express.Router()

trainingModuleRouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
trainingModuleRouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
trainingModuleRouter.put("/:_id",authenticateToken, authorizeRoles('admin'),  handleUpdateUserById);
trainingModuleRouter.delete("/:id",authenticateToken, authorizeRoles('admin'),  handleDeleteUserById);


module.exports = trainingModuleRouter