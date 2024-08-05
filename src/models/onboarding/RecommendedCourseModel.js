const mongoose = require("mongoose");

const RecommendedCourseSchema = new mongoose.Schema({
    OnboardingCardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OnboardingCard",
        required: true
    },
    SelectableAnswer: {
        type: String,
        require : true
    },
    RecommendedCourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OnboardingCard",
        required: true,
    },
});

const RecommendedCourseModel = mongoose.model("RecommendedCourseModel", RecommendedCourseSchema);

module.exports = RecommendedCourseModel;
