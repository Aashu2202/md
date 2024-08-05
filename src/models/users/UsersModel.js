const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        Unique: true,
    },
    Provider: {
        type: String,
        require : true,
        enum: ["Google", "Facebook", "Apple", "Email", "Temporary"]  
    },
    First_name: {
        type: String,
        required: true,
    },
    Last_name: {
        type: String,
    },
    Password: {
        type: String,
        required: true,
    },
    Password_confirmation: {
        type: String,
        required: true,
    },
    Subscription_plan: {
        type: String,
    },
    Subscription_source: {
        type: String,
    },
    subscription_duration:{
        type: String,
    },
    AdminSubscriptionFlag :{
        type: Boolean,
        default: false,
    },
    PreventAutoSubScriptionVerfify: {
        type: Boolean,
        default: false,
    }, 
    Tester:{
        type: Boolean,
        default: false,
    },
    AllDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OnboardingCard",
        }
    ]
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
