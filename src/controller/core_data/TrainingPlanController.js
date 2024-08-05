const TrainingPlanModel = require("../../models/core_data/TrainingPlanModel");
const {deleteUserById} = require("../../utils/DeleteAllData");
const {getAllDetails} = require("../../utils/GetAllData");


// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req,res,TrainingPlanModel);
}
// Post method API
async function handleCreateUser(req, res) {
    const {
        TitleEn,
        TitleDe,
        Hidden,
        BasicCourse,
        MasterClassCourse,
        New,
        Free,
        Position,
        RequirePenAndPaper,
        MaleCover,
        FemaleCover,
        OtherCover,
        Image,
        ImageV2,
        MasterClassCover,
        TrailerVideo,
        DescriptionEn,
        DescriptionDe,
        ShortDescriptionEn,
        ShortDescriptionDe,
        DurationEn,
        DurationDe,
        CoachName,
        CoachProfileParagraph1En,
        CoachProfileParagraph1De,
        CoachProfileParagraph2En,
        CoachProfileParagraph2De,
        CoachProfileParagraph3En,
        CoachProfileParagraph3De,
        ResultsAndBenefitsEn,
        ResultsAndBenefitsDe,
        TagsID,
        CompletionMessageEn,
        CompletionMessageDe,
        GoalBoosterStep1TitleEn,
        GoalBoosterStep1TitleDe,
        Partner,
        CategoriesId,
        TrainingModulesId
    } = req.body;

    try {
        const newTrainingPlan = await TrainingPlanModel.create({
            TitleEn,
            TitleDe,
            Hidden,
            BasicCourse,
            MasterClassCourse,
            New,
            Free,
            Position,
            RequirePenAndPaper,
            MaleCover,
            FemaleCover,
            OtherCover,
            Image,
            ImageV2,
            MasterClassCover,
            TrailerVideo,
            DescriptionEn,
            DescriptionDe,
            ShortDescriptionEn,
            ShortDescriptionDe,
            DurationEn,
            DurationDe,
            CoachName,
            CoachProfileParagraph1En,
            CoachProfileParagraph1De,
            CoachProfileParagraph2En,
            CoachProfileParagraph2De,
            CoachProfileParagraph3En,
            CoachProfileParagraph3De,
            ResultsAndBenefitsEn,
            ResultsAndBenefitsDe,
            TagsID,
            CompletionMessageEn,
            CompletionMessageDe,
            GoalBoosterStep1TitleEn,
            GoalBoosterStep1TitleDe,
            Partner,
            CategoriesId,
            TrainingModulesId
        });
        return res.status(200).json({ status: "Successfully added to the training plan schema", newTrainingPlan });
    } catch (err) {
        console.error("Error in POST request:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
// Update the user data
async function handleUpdateUserById(req, res) {
    try {
        const changes = req.body;
        const updatedUser = await TrainingPlanModel.findByIdAndUpdate(req.params._id, changes, { new: true });
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
        const deletedUserStatus = deleteUserById(TrainingPlanModel, req.params.id);
        if(!deletedUserStatus) {
            return res.status(404).json({ error: "Training plan not found" });
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
