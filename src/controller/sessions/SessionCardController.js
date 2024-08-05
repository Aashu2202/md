const SessionCardModel = require("../../models/sessions/SessionCardModel");
const SessionModel = require("../../models/sessions/SessionModel");
const { deleteUserById } = require("../../utils/DeleteAllData");
const {getAllDetails} = require("../../utils/GetAllData");
// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req,res,SessionCardModel);
}

// Post method API
async function handleCreateUser(req, res) {
    const {
        CardType,
        TitleEn,
        TitleDe,
        AudioFileEn,
        AudioFileDe,
        KeyMoment,
        MetaInfoLine1En,
        MetaInfoLine1De,
        MetaInfoLine2En,
        MetaInfoLine2De,
        ShowMetaaInfoLine1En,
        ShowMetaaInfoLine2En,
        ShowMetaaInfoLine1De,
        ShowMetaaInfoLine2De,
        TextEn,
        TextDe,
        MarkDownTextEn,
        MarkDownTextDe,
        FirstTimeFlag,
        AutoSwipeMedia,
        Input,
        SessionId // Add the SessionId field here
    } = req.body;

    try {
        const newSessionCard = await SessionCardModel.create({
            CardType,
            TitleEn,
            TitleDe,
            AudioFileEn,
            AudioFileDe,
            KeyMoment,
            MetaInfoLine1En,
            MetaInfoLine1De,
            MetaInfoLine2En,
            MetaInfoLine2De,
            ShowMetaaInfoLine1En,
            ShowMetaaInfoLine2En,
            ShowMetaaInfoLine1De,
            ShowMetaaInfoLine2De,
            TextEn,
            TextDe,
            MarkDownTextEn,
            MarkDownTextDe,
            FirstTimeFlag,
            AutoSwipeMedia,
            Input,
            SessionId
        });

        // Update the SessionModel to push the new card ID to the SessionCardId array
        const Session = await SessionModel.findById(SessionId);
        if (!Session) {
            return res.status(404).json({ error: "Funnel not found" });
        }

        Session.SessionCardId.push(newSessionCard._id);
        await Session.save();

        return res.status(201).json({ status: "Session card created successfully", newSessionCard });
    } catch (error) {
        console.error("Error creating session card:", error);
        return res.status(500).json({ error: "Something went wrong while creating the session card" });
    }
}

// Update the user data
async function handleUpdateUserById(req, res) {
  try {
    const changes = req.body;
    const updatedUser = await SessionCardModel.findByIdAndUpdate(
      req.params.id,
      changes,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ status: "User not found" });
    }
    return res
      .status(200)
      .json({ status: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Error updating user" });
  }
}

// Delete user
async function handleDeleteUserById(req, res) {
    try {
        // Find the onboarding card by ID
        const cardData = await SessionCardModel.findById(req.params.id);
        if (!cardData) {
            return res.status(404).json({ error: "session card not found" });
        }

        // Delete the onboarding card
        const deletedUser = await deleteUserById(SessionCardModel, req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "session card not found" });
        }

        // Update the SessionModel to remove the deleted card ID from the SessionCardId array
        await SessionModel.findByIdAndUpdate(cardData.SessionId, {
            $pull: { SessionCardId: req.params.id }
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
