const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
    wins:{
        type:Number
    },
    losses:{
        type:Number
    },

    owner:{
        type:mongoose.Schema.ObjectId,ref:"User"
    }
})
module.exports = mongoose.model("Score",ScoreSchema)