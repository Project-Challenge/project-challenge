const mongoose = require("mongoose")

const ChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: "No description was provided",
    },
    state: { //  0 - created, 1 - pending, 2 - finished
      type: Number,
      required: false,
      default: 0,
    },
    creationDate: {
      type: Date,
      required: true,
    },
   pendingDate: {
      type: Date,
      required: false,
    },
    finishedDate: {
      type: Date,
      required: false,
    },
    
    startDate: { // if there is no start/end date treat as indefinite
      type: Date,
      required: false,
    },
    endDate: {  
      type: Date,
      required: false,
    },
    
    createdBy: { // userID
      type: String,
      required: true,
    },
    finishedBy: { // userID
      type: String,
      required: false,
    },
    verifiedBy: { // userID
      type: String,
      required: false,
    },
});

const ChallengeModel = mongoose.model("challenges", ChallengeSchema)
module.exports = ChallengeModel;