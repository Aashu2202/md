const SessionModel = require("../../models/sessions/SessionModel");
const OnboardingCardModel = require("../../models/onboarding/OnboardingCardModel");
const SessionCardModel = require("../../models/sessions/SessionCardModel"); // Assuming you have a model for the session cards
const { getAllDetails } = require("../../utils/DeleteAllData");

// Get all users (sessions)
async function handleGetAllUsers(req, res) {
    getAllDetails(req, res, SessionModel);
}

// Create a new session
async function handleCreateUser(req, res) {
    const {
        TitleEn,
        Title,
        Searchable,
        Hidden,
        Free,
        New,
        Updated,
        Testable,
        HideSessionRating,
        ImageURL,
        HighResImgURL,
        ImageURLV2,
        HighResImgURLV2,
        DescriptionEn,
        DescriptionDe,
        ShortDescriptionEn,
        ShortDescriptionDe,
        BenefitEn,
        BenefitDe,
        Duration,
        EquipmentEn,
        EquipmentDe,
        TagForMindShineV1,
        TagForMindShineV2,
        TagsV2,
        SessionCardId // Assuming this is an array of IDs
    } = req.body;

    try {
        const newSession = await SessionModel.create({
            TitleEn,
            Title,
            Searchable,
            Hidden,
            Free,
            New,
            Updated,
            Testable,
            HideSessionRating,
            ImageURL,
            HighResImgURL,
            ImageURLV2,
            HighResImgURLV2,
            DescriptionEn,
            DescriptionDe,
            ShortDescriptionEn,
            ShortDescriptionDe,
            BenefitEn,
            BenefitDe,
            Duration,
            EquipmentEn,
            EquipmentDe,
            TagForMindShineV1,
            TagForMindShineV2,
            TagsV2,
            SessionCardId // Ensure this matches your schema
        });

        return res.status(201).json({ status: "Successfully added to the card schema and funnel", newSession });
    } catch (error) {
        console.error("Error creating session:", error);
        return res.status(500).json({ status: "Error creating session", error: error.message });
    }
}

// Delete a session by ID
async function handleDeleteUserById(req, res) {
    try {
        const sessionId = req.params.id;

        // Find and delete the session
        const deletedSession = await SessionModel.findByIdAndDelete(sessionId);

        if (!deletedSession) {
            return res.status(404).json({ error: "Session not found" });
        }

        // Find and delete related session cards
        await SessionCardModel.deleteMany({ _id: { $in: deletedSession.SessionCardId } });


        // Ensure that OnboardingOptions is an array and remove references to the deleted session
        await OnboardingCardModel.updateMany(
            { "OnboardingOptions.SessionID": sessionId }, // Match documents containing the session ID
            { 
                $set: {
                    "OnboardingOptions.$[elem].SessionID": null // Set SessionID to null for matched elements
                }
            },
            { arrayFilters: [{ "elem.SessionID": sessionId }] } // Specify which elements to update
        );




        return res.status(200).json({ status: "Session deleted successfully" });
    } catch (error) {
        console.error("Error deleting session:", error);
        return res.status(500).json({ status: "Error deleting session", error: error.message });
    }
}

// Update a session by ID
async function handleUpdateUserById(req, res) {
    try {
        // const sessionId = req.params.id;
        const changes = req.body;

        const updatedSession = await SessionModel.findByIdAndUpdate(req.params._id, changes, { new: true });

        if (!updatedSession) {
            return res.status(404).json({ status: "Session not found" });
        }

        return res.status(200).json({ status: "Session updated successfully", updatedSession });
    } catch (error) {
        console.error("Error updating session:", error);
        return res.status(500).json({ status: "Error updating session", error: error.message });
    }
}

module.exports = {
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
    handleGetAllUsers
};
