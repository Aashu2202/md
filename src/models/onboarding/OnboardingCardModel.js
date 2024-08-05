const mongoose = require("mongoose"); 

const WelcomeSchema = new mongoose.Schema({
    WelcomeScreen_CTAEn: {
        type: String,
    },
    WelcomeScreen_CTADe:{
        type: String,
    },
    WelcomeScreen_HeadlineEn:{
        type: String,
    },
    WelcomeScreen_HeadlineDe:{
        type: String,
    },
    WelcomeScreen_SubHeadlineEn:{
        type: String,
    },
    WelcomeScreen_SubHeadlineDe:{
        type: String,
    },
    WelcomeScreen_SubHeadline2En:{
        type: String,
    },
    WelcomeScreen_SubHeadline2De:{
        type: String,
    },
    WelcomeScreen_AlternativeSignupCtaTextEn: {
        type: String,
    },
    WelcomeScreen_AlternativeSignupCtaTextDe: {
        type: String,
    },
    WelcomeScreen_HeaderImageURL:{
        type: String,
    },
    WelcomeScreen_VideoLinkEn:{
        type: String,
    },
    WelcomeScreen_VideoLinkDe:{
        type: String,
    },
})
const CardContentSchema = new mongoose.Schema({
    CardContent_HeroImage:{
        type: String,
    },
    CartContent_HeroHeadingEn:{
        type: String,
    },
    CartContent_HeroHeadingDe:{
        type: String,
    },
    CartContent_HeroBodyEn:{
        type: String,
    },
    CartContent_HeroBodyDe:{
        type: String,
    },
    CartContent_Section1Image:{
        type: String,
    },
    CartContent_Section1Heading:{
        type: String,
    },
    CartContent_Section1Body:{
        type: String,
    },
})
const JoinNewsLetterSchema = new mongoose.Schema({
    JoinNewsLetterOptIn_Show: {
        type: String
    },
    JoinNewsLetterOptIn_CopyEn: {
        type: String
    },
    JoinNewsLetterOptIn_CopyDe: {
        type: String
    },
})
const TrainingReminderSchema = new mongoose.Schema({
    TrainingRemindersOptIn_Show: {
        type: String
    },
    TrainingRemindersOptIn_CopyEn: {
        type: String
    },
    TrainingRemindersOptIn_CopyDe: {
        type: String
    },
})
const AppTrackingSchema = new mongoose.Schema({
    AppTrackingOptIn_Show: {
        type: String
    },
    AppTrackingOptIn_CopyEn: {
        type: String
    },
    AppTrackingOptIn_CopyDe: {
        type: String
    },
})
const NameScreenSchema = new mongoose.Schema({
    NameScreenHeadline_En: {
        type: String
    },
    NameScreenHeadline_De: {
        type: String
    },
    NameScreenSubHeadline_En: {
        type: String
    },
    NameScreenSubHeadline_De: {
        type: String
    },
    NameScreenCTA_En: {
        type: String
    },
    NameScreenCTA_De: {
        type: String
    },
})
const SignupSchema = new mongoose.Schema({
    SignupHeaderImageUrl: {
        type: String
    },
    SignupHeadlineEn: {
        type: String
    },
    SignupHeadlineDe: {
        type: String
    },
    SignupBodyEn: {
        type: String
    },
    SignupBodyDe: {
        type: String
    },
    SignupCTAEn: {
        type: String
    },
    SignupCTADe: {
        type: String
    },
})
const LoginSchema = new mongoose.Schema({
    LoginHeaderImageUrl: {
        type: String
    },
    LoginHeadlineEn: {
        type: String
    },
    LoginHeadlineDe: {
        type: String
    },
    LoginBodyEn: {
        type: String
    },
    LoginBodyDe: {
        type: String
    },
    LoginCTAEn: {
        type: String
    },
    LoginCTADe: {
        type: String
    },
})




const OnboardingCardSchema = new mongoose.Schema({
    CardType: {
        type: String,
        required: true,
        enum: ["Multichoice-SingleAnswer","MultiChoice-MultiAnswer", "Statement", "Video", "Dropdown", "Payment Screen", "Review", "Consent", "Splash", "Low Friction", "Password", "Signup"]
    },
    CardName: {
        type: String,
        require : true
    },
    GA4ScreenTitle: {
        type: String,
    },
    CardPosition: {
        type: Number,
        required: true,
    },
    LinkedToCard: {
        type: String,
        required: true,
    },
    LinkedToCardOption: {
        type: String,
        required: true
    },
    isHiddenEn: {
        type: Boolean,
        default: false,
    },
    isHiddenDe: {
        type: Boolean,
        default: false,
    },
    isMandatory: {
        type: Boolean,
        default: false,
    },
    isLinkedCard: {
        type: Boolean,
        default: false,
    },
    isLoginWithEmail: {
        type: Boolean,
        default: false,
    },
    isProgressBarHidden: {
        type: Boolean,
        default: false,
    },
    ScreenPosition: {
        type: Number,
    },
    ScreenNumberTotal: {
        type: Number,
    },

    // Welcome Screen Content
    WelcomeScreen: {
        type: WelcomeSchema
    },
    
    CardContent: {
        type: CardContentSchema
    },
    
    JoinNewsLetter: {
        type: JoinNewsLetterSchema
    },

    TrainingReminder: {
        type: TrainingReminderSchema
    },
    
    AppTracking: {
        type: AppTrackingSchema
    },
    
    Image_GIf: {
        type: String
    },

    NameScreen:{
        type: NameScreenSchema
    },

    Signup: {
        type: SignupSchema
    },
    Login: {
        type: LoginSchema
    },
    
    OnboardingOptions:[{
        AnswerOptionTextEn: {
            type: String,
        },
        AnswerOptionTextDe: {
            type: String,
        },
        LinkedCard: {
            type: String,
        },
        ImageURL: {
            type: String,
        },
        Order: {
            type: Number,
        },
        SessionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SessionModel",
            default: null,
        },
        RecommendedCourseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
            default: null,
        },
        RecommendedCourseModelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RecommendedCourseModel",
            default: null,
        },
        HeadlineEn: {
            type: String,
        },
        HeadlineDe: {
            type: String,
        },
        CopyEn: {
            type: String,
        },
        CopyDe: {
            type: String,
        },
        TextEn: {
            type: String,
        },
        TextDe: {
            type: String,
        },
        BodyEn:{
            type: String,
        },
        BodyDe:{
            type: String,
        },
        UserNameEn:{
            type: String,
        },
        UserNameDe:{
            type: String,
        },
        Position:{
            type: String,
        },
    }],
    FunnelId:{
        type: mongoose.Schema.Types.ObjectId,
        Ref: "FunnelModel",
    },
});

const OnboardingCardModel = mongoose.model("OnboardingCard", OnboardingCardSchema);

module.exports = OnboardingCardModel;