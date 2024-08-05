const UserModel = require("../../models/users/UsersModel");
const {deleteUserById} = require("../../utils/DeleteAllData");
const {getAllDetails} = require("../../utils/GetAllData");


// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req,res,UserModel);
}
// Post method API
async function handleCreateUser(req, res) {
    const {Email, Provider, First_name, Last_name, Password, Password_confirmation, Subscription_plan, Subscription_source, subscription_duration,AdminSubscriptionFlag,PreventAutoSubScriptionVerfify,Tester, AllDetails} = req.body;

    if (!Email || !First_name || !Password || !Password_confirmation) {
        return res.status(400).json({ error: "Email, name, and password are required" });
    }
    if (Password !== Password_confirmation) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const newUser = await UserModel.create({
            Email,
            Provider,
            First_name,
            Last_name,
            Password,
            Password_confirmation,
            Subscription_plan,
            Subscription_source,
            subscription_duration,
            AdminSubscriptionFlag,
            PreventAutoSubScriptionVerfify,
            Tester,
            AllDetails
        });
        return res.status(200).json({ status: "Successfully added to the user schema", newUser });
    } catch (err) {
        console.error("Error in POST request:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

// Update the user data
async function handleUpdateUserById(req, res) {
    try {
        const changes = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(req.params._id, changes, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: "User not found" });
        }
        return res.status(200).json({ status: "User updated successfully", updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Error updating user" });
    }
}

// Delete user
async function handleDeleteUserById(req, res) {
    try {
        const deletedUserStatus = deleteUserById(UserModel, req.params.id);
        if(!deletedUserStatus) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ status: "Success" });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Error deleting user" });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
};
