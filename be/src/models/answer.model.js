var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var findOrCreate = require("mongoose-findorcreate");

var answerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId
    },
    workerId: {
      type: String
    },
    slotId: {
      type: String
    },
    randKey: {
      type: String
    },
    campaignId: {
      type: String
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    groupSurvey: {
      type: String
    },
    responses: [
      {
        name: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);
answerSchema.plugin(findOrCreate);

answerSchema.virtual("user", {
  ref: "user",
  localField: "_id",
  foreignField: "userId"
});

export default mongoose.model("answer4", answerSchema);
