const mongoose = require("mongoose");

const FunnelSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Link: {
        type: String,
        require : true
    },
    DeepLink: {
        type: String,
        required: true,
    },
    SignUpType: {
        type: String,
        required: true,
    },
    FreePeriod: {
        type: String,
        required: true,
    },
    Partner: {
        type: String,
    },
    FunnelDescription: {
        type: String,
    },
    OnboardingCards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OnboardingCard",
        }
    ]
});

const FunnelModel = mongoose.model("FunnelModel", FunnelSchema);

module.exports = FunnelModel;
