const mongoose = require("mongoose");

const trainingPlanSchema = mongoose.Schema({
  TitleEn: {
    type: String
  },
  TitleDe: {
    type: String
  },
  Hidden: {
    type: Boolean
  },
  BasicCourse: {
    type: Boolean
  },
  MasterClassCourse: {
    type: Boolean
  },
  New: {
    type: Boolean
  },
  Free: {
    type: Boolean
  },
  Position: {
    type: Number
  },
  RequirePenAndPaper: {
    type: Boolean
  },
  MaleCover: {
    type: String
  },
  FemaleCover: {
    type: String
  },
  OtherCover: {
    type: String
  },
  Image: {
    type: String
  },
  ImageV2: {
    type: String
  },
  MasterClassCover: {
    type: String
  },
  TrailerVideo: {
    type: String
  },
  DescriptionEn: {
    type: String
  },
  DescriptionDe: {
    type: String
  },
  ShortDescriptionEn: {
    type: String
  },
  ShortDescriptionDe: {
    type: String
  },
  DurationEn: {
    type: Number
  },
  DurationDe: {
    type: Number
  },
  CoachName: {
    type: String
  },
  CoachProfileParagraph1En: {
    type: String
  },
  CoachProfileParagraph1De: {
    type: String
  },
  CoachProfileParagraph2En: {
    type: String
  },
  CoachProfileParagraph2De: {
    type: String
  },
  CoachProfileParagraph3En: {
    type: String
  },
  CoachProfileParagraph3De: {
    type: String
  },
  ResultsAndBenefitsEn: {
    type: String
  },
  ResultsAndBenefitsDe: {
    type: String
  },
  TagsID: {
    type: Number
  },
  CompletionMessageEn: {
    type: String
  },
  CompletionMessageDe: {
    type: String
  },
  GoalBoosterStep1TitleEn: {
    type: String
  },
  GoalBoosterStep1TitleDe: {
    type: String
  },
  Partner: {
    type: String
  },
  CategoriesId: {
    type: Number
  },
  TrainingModulesId: [{
    type: Number
  }]
});

const TrainingPlanModel = mongoose.model("TrainingPlanModel", trainingPlanSchema);
module.exports = TrainingPlanModel;