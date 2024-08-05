const mongoose = require("mongoose");

const trainingModuleSchema = mongoose.Schema({
  TitleEN: {
    type: String
  },
  TitleDE: {
    type: String
  },
  FullTitleEN: {
    type: String
  },
  FullTitleDE: {
    type: String
  },
  SubTitleEN: {
    type: String
  },
  SubTitleDE: {
    type: String
  },
  Hidden: {
    type: Boolean
  },
  TrainingItems: [
    {
      InspiringQoutesID: String,
      CoachMessagesIDs: [String]
    }
  ],
  TrainingPlansId: {
    type: Number
  }
});

const TrainingModuleModel = mongoose.model("TrainingModuleModel", trainingModuleSchema);
module.exports = TrainingModuleModel;