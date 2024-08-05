const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const { check, validationResult } = require('express-validator');
const db = require('./db'); // Ensure this correctly handles DB connection

const FunnelRouter = require("../src/routes/onboarding/OnboardFunnelRouter");
const onboardrouter = require("../src/routes/onboarding/OnboardingCardRouter");
const sessionRouter = require("../src/routes/sessions/SessionRouter");
const userrouter = require("../src/routes/users/UsersRouter");
const sessionCardRouter = require("../src/routes/sessions/SessionCardRouter");
const trainingPlanRouter = require("../src/routes/core_data/TrainingPlanRouter");
const trainingModuleRouter = require("../src/routes/core_data/TrainingModuleRouter");
const adminRoutes = require("../src/routes/admin/adminRoutes");
const authenticationRoutes = require("../src/routes/auththentication/authRoutes");



function init(){
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 8003;

const app = express();

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Use routes
app.use("/api", FunnelRouter);
app.use("/api/onboard", onboardrouter);
app.use("/api/session", sessionRouter);
app.use("/api/users", userrouter);
app.use("/api/sessioncard", sessionCardRouter);
app.use("/api/trainingPlan", trainingPlanRouter);
app.use("/api/trainingModule", trainingModuleRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authenticationRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});


}
module.exports = init;