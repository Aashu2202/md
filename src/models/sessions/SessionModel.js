const mongoose = require("mongoose");
const SessionSchema = new mongoose.Schema({
    TitleEn:{
        type: String,
    },
    Title:{
        type: String,
    },
    Searchable:{
        type: Boolean,
        default: false
    },
    Hidden:{
        type: Boolean,
        default: false
    },
    Free:{
        type: Boolean,
        default: false
    },
    New:{
        type: Boolean,
        default: false
    },
    Updated:{
        type: Boolean,
        default: false
    },
    Testable:{
        type: Boolean,
        default: false
    },
    HideSessionRating:{
        type: Boolean,
        default: false
    },
    ImageURL:{
        type: String
    },
    HighResImgURL:{
        type: String
    },
    ImageURLV2:{
        type: String
    },
    HighResImgURLV2:{
        type: String
    },
   DescriptionEn:{
       type: String
   },
   DescriptionDe:{
       type: String
   },
   ShortDescriptionEn:{
       type: String
   },
   ShortDescriptionDe:{
       type: String
   },
   BenefitEn:{
       type: String
   },
   BenefitDe:{
       type: String
   },
   Duration:{
       type: String
   },
   EquipmentEn:{
       type: String
   },
   EquipmentDe:{
       type: String
   },
   TagForMindShineV1:{
       type: String
   },
   TagForMindShineV2:{
       type: String
   },
   TagsV2:{
       type: String
   },
   SessionCardId:[{
       type: mongoose.Schema.Types.ObjectId,
       Ref: "SessionCardModel",
       default: null,
    }]
}, { timestamps: true })

const SessionModel = mongoose.model("SessionModel", SessionSchema);
module.exports = SessionModel;