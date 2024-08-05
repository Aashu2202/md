const mongoose = require("mongoose");
const sessioncard = mongoose.Schema({
    CardType:{
        type: String,
        require : true,
        enum: ["Video", "Audio", "Test", "Last"]
    },
    TitleEn:{
        type: String,
    },
    TitleDe:{
        type: String,
    },
    AudioFileEn:{
        type : String,
    },
    AudioFileDe:{
        type: String,
    },
    KeyMoment:[{
            TimeSec:{
                type: String,
            },
            MomentTitle:{
                type: String,
            }
    }],
    MetaInfoLine1En:{
        type: String,
    },
    MetaInfoLine1De:{
        type: String,
    },
    MetaInfoLine2En:{
        type: String,
    },
    MetaInfoLine2De:{
        type: String,
    },
    ShowMetaaInfoLine1En:{
        type: Boolean
    },
    ShowMetaaInfoLine2En:{
        type: Boolean
    },
    ShowMetaaInfoLine1De:{
        type: Boolean
    },
    ShowMetaaInfoLine2De:{
        type: Boolean
    },
    TextEn:{
        type:String
    },
    TextDe:{
        type:String
    },
    MarkDownTextEn:{
        type :  String,
    },
    MarkDownTextDe:{
        type :  String,
    },
    FirstTimeFlag:{
        type: String,
    },
    AutoSwipeMedia:{
        type:String,
    },
    Input:[{
        Headline:{
            type: String,
        },
        Description:{
            type:String,
        },
        InputType:{
            type:String,
        },
        Key:{
            type :String,
        },
        MaxImageCount:{
            type:String,
        },
    }],
    SessionId:{
        type: mongoose.Schema.Types.ObjectId,
       Ref: "SessionModel",
       default: null,
    }
})

const sessionCardModel = mongoose.model("sessionCardModel", sessioncard);
module.exports = sessionCardModel