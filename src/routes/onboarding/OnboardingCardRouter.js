const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../../controller/onboarding/OnboardingCardController");
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const onboardrouter = express.Router();

onboardrouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
onboardrouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
onboardrouter.put("/:_id",authenticateToken, authorizeRoles('admin'), handleUpdateUserById);
onboardrouter.delete("/:id",authenticateToken, authorizeRoles('admin'), handleDeleteUserById);

module.exports = onboardrouter;
