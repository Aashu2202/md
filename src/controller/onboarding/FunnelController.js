const FunnelModel = require("../../models/onboarding/FunnelModel");
const OnboardingCardModel = require("../../models/onboarding/OnboardingCardModel");
const {deleteUserById} = require("../../utils/DeleteAllData");
const {deleteRecommendedCourseModels} = require("../../utils/DeleteRecommendedCard");
const {getAllDetails} = require("../../utils/GetAllData");
// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req,res,FunnelModel);
}

// Post method API
async function handleCreateUser(req, res) {
    const {Name, Link, DeepLink, SignUpType, FreePeriod, Partner, FunnelDescription, OnboardingCards } = req.body;

    console.log(Name, Link, DeepLink, SignUpType, FreePeriod, Partner, FunnelDescription, OnboardingCards);
    if (!Name || !Link || !DeepLink || !SignUpType) {
        return res.status(400).json({ error: "Email, name, and password are required" });
    }

    try {
        const newUser = await FunnelModel.create({
            Name,
            Link,
            DeepLink,
            SignUpType,
            FreePeriod,
            Partner,
            FunnelDescription,
            OnboardingCards,
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
        const updatedUser = await FunnelModel.findByIdAndUpdate(req.params._id, changes, { new: true });
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
        // Find the funnel by ID
        const funnel = await FunnelModel.findById(req.params.id);
        if (!funnel) {
            return res.status(404).json({ error: "Funnel not found" });
        }

        // Iterate through each OnboardingCard in the funnel
        for (const cardId of funnel.OnboardingCards) {
            // Find the onboarding card by ID
            const cardData = await OnboardingCardModel.findById(cardId);
            if (cardData) {
                // Collect all RecommendedCourseModelIds from OnboardingOptions
                const recommendedCourseModelIds = cardData.OnboardingOptions.map(option => option.RecommendedCourseModelId);
                
                // Delete the onboarding card
                await deleteUserById(OnboardingCardModel, cardId);
                
                // Delete all related recommended course cards
                await deleteRecommendedCourseModels(recommendedCourseModelIds);
            }
        }

        // Delete the funnel
        const deletedFunnel = await FunnelModel.findByIdAndDelete(req.params.id);
        if (!deletedFunnel) {
            return res.status(404).json({ error: "Funnel not found" });
        }

        return res.json({ status: "Success" });
    } catch (error) {
        console.error("Error deleting funnel:", error);
        return res.status(500).json({ error: "Error deleting funnel" });
    }
}


module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
};
