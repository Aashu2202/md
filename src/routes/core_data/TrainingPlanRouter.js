const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../../controller/core_data/TrainingPlanController")
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const trainingPlanRouter = express.Router()

trainingPlanRouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
trainingPlanRouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
trainingPlanRouter.put("/:_id",authenticateToken, authorizeRoles('admin'), handleUpdateUserById);
trainingPlanRouter.delete("/:id",authenticateToken, authorizeRoles('admin'), handleDeleteUserById);


module.exports = trainingPlanRouter