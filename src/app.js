const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser'); 
const dotenv = require("dotenv")


const FunnelRouter = require("../src/routes/onboarding/OnboardFunnelRouter");
const onboardrouter = require("../src/routes/onboarding/OnboardingCardRouter");
const sessionRouter = require("../src/routes/sessions/SessionRouter");
const userrouter = require("../src/routes/users/UsersRouter");
const sessionCardRouter = require("../src/routes/sessions/SessionCardRouter");
const trainingPlanRouter = require("../src/routes/core_data/TrainingPlanRouter");
const trainingModuleRouter = require("../src/routes/core_data/TrainingModuleRouter");
const adminRoutes = require("../src/routes/admin/adminRoutes")
const authenticationRoutes = require("../src/routes/auththentication/authRoutes")
const app = express();
dotenv.config({
  path: './.env'
})
const PORT = process.env.PORT;
function init () {
  

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.use("/api", FunnelRouter);
app.use("/api/onboard", onboardrouter);
app.use("/api/session", sessionRouter);
app.use("/api/users", userrouter);
app.use("/api/sessioncard", sessionCardRouter);
app.use("/api/trainingPlan", trainingPlanRouter);
app.use("/api/trainingModule", trainingModuleRouter);
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authenticationRoutes)
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
}

module.exports = init