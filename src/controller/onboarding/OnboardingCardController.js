const OnboardingCardModel = require("../../models/onboarding/OnboardingCardModel");
const FunnelModel = require("../../models/onboarding/FunnelModel");
const { deleteUserById } = require("../../utils/DeleteAllData");
const { deleteRecommendedCourseModels } = require("../../utils/DeleteRecommendedCard");
const RecommendedCourseModel = require("../../models/onboarding/RecommendedCourseModel")
const SessionModel = require("../../models/sessions/SessionModel")
const {getAllDetails} = require("../../utils/GetAllData");
// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req,res,OnboardingCardModel);
}
// Post method API
async function handleCreateUser(req, res) {
    const {
        CardType,
        CardName,
        GA4ScreenTitle,
        CardPosition,
        LinkedToCard,
        LinkedToCardOption,
        isHiddenEn = false,
        isHiddenDe = false,
        isMandatory = false,
        isLinkedCard = false,
        isLoginWithEmail = false,
        isProgressBarHidden = false,
        ScreenPosition,
        ScreenNumberTotal,
        WelcomeScreen,
        CardContent,
        JoinNewsLetter,
        TrainingReminder,
        AppTracking,
        Image_GIf,
        NameScreen,
        Signup,
        Login,
        OnboardingOptions,
        FunnelId,
    } = req.body;

    try {
        
        const newCard = await OnboardingCardModel.create({
            CardType,
            CardName,
            GA4ScreenTitle,
            CardPosition,
            LinkedToCard,
            LinkedToCardOption,
            isHiddenEn,
            isHiddenDe,
            isMandatory,
            isLinkedCard,
            isLoginWithEmail,
            isProgressBarHidden,
            ScreenPosition,
            ScreenNumberTotal,
            WelcomeScreen,
            CardContent,
            JoinNewsLetter,
            TrainingReminder,
            AppTracking,
            Image_GIf,
            NameScreen,
            Signup,
            Login,
            FunnelId,
            OnboardingOptions
        });
        const funnel = await FunnelModel.findById(FunnelId);
        if (!funnel) {
            return res.status(404).json({ error: "Funnel not found" });
        }

        await Promise.all(OnboardingOptions.map(async (option, index) => {
            const sessions = await SessionModel.find({
                TitleEn: option.AnswerOptionTextEn
            });
            if (sessions.length > 0) {
                newCard.OnboardingOptions[index].SessionID = sessions.map(session => session._id);
            } else {
                newCard.OnboardingOptions[index].SessionID = null;
            }
            
            if (option.RecommendedCourseId) {
                const recommendedCourse = await RecommendedCourseModel.create({
                    OnboardingCardId: newCard._id,
                    SelectableAnswer: option.AnswerOptionTextEn,
                    RecommendedCourseId: option.RecommendedCourseId
                });

                
                // Update OnboardingOptions with the newly created RecommendedCourseModel ID
                newCard.OnboardingOptions[index].RecommendedCourseModelId = recommendedCourse._id;
            }
        }));

        // Save the updated OnboardingCard
        await newCard.save();

        funnel.OnboardingCards.push(newCard._id);
        await funnel.save();
        return res.status(200).json({ status: "Successfully added to the card schema and funnel", newCard });
    } catch (err) {
        console.error("Error in POST request:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}


// Update the user data
async function handleUpdateUserById(req, res) {
    try {
        const changes = req.body;
        const updatedUser = await OnboardingCardModel.findByIdAndUpdate(req.params._id, changes, { new: true });

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
        // Find the onboarding card by ID
        const cardData = await OnboardingCardModel.findById(req.params.id);
        if (!cardData) {
            return res.status(404).json({ error: "Onboarding card not found" });
        }

        // Collect all RecommendedCourseModelIds from OnboardingOptions
        const recommendedCourseModelIds = cardData.OnboardingOptions.map(option => option.RecommendedCourseModelId);

        // Delete the onboarding card
        const deletedUser = await deleteUserById(OnboardingCardModel, req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "Onboarding card not found" });
        }

        // Delete all related recommended course cards
        await deleteRecommendedCourseModels(recommendedCourseModelIds);

        // Update the funnel to remove the deleted card ID
        await FunnelModel.findByIdAndUpdate(cardData.FunnelId, {
            $pull: { OnboardingCards: req.params.id }
        });

        return res.json({ status: "Success" });
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}



module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
};
