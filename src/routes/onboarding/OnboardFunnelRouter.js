const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../../controller/onboarding/FunnelController");
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');
const FunnelRouter = express.Router();

FunnelRouter.get("/",authenticateToken, authorizeRoles('admin'), handleGetAllUsers);
FunnelRouter.post("/",authenticateToken, authorizeRoles('admin'), handleCreateUser);
FunnelRouter.put("/:_id",authenticateToken, authorizeRoles('admin'), handleUpdateUserById);
FunnelRouter.delete("/:id",authenticateToken, authorizeRoles('admin'), handleDeleteUserById);

module.exports = FunnelRouter;
