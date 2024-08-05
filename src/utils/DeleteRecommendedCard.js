const RecommendedCourseModel = require("../models/onboarding/RecommendedCourseModel");
const deleteRecommendedCourseModels = async (recommendedCourseModelIds) => {
    try {
        await RecommendedCourseModel.deleteMany({
            _id: { $in: recommendedCourseModelIds }
        });
    } catch (error) {
        console.error("Error deleting recommended course models:", error);
        throw error;
    }
};

module.exports = { deleteRecommendedCourseModels };
