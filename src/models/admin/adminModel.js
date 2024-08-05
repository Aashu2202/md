const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordSentAt: {
        type: String,
        default: null
    },
    rememberCreatedAt: {
        type: Date,
    },
    currentSignInAt: {
        type: Date,
    },
    lastSignInAt: {
        type: Date,
    },
    currentSignInIP: {
        type: String,
    },
    LastSignInIP: {
        type: String,
    },
},{timestamps: true, timeseries: true})

const admin = mongoose.model("admin", adminSchema)

module.exports = {
    admin
}