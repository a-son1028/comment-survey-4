var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var groupSchema = new Schema(
  {
    commentId: String,
    userName: String,
    comment: String,
    appName: String,
    rating: String,
    thumbsUp: String,
    isLabeled: Boolean,
    isAnalyzed: {
      type: Boolean,
      default: false,
    },
    isGetStructure: {
      type: Boolean,
      default: false,
    },
    securityKeyWords: Array, 
    securitySimiWords: Schema.Types.Mixed, 
    securityStructure: Array,
    securityStructureWithKeywords: Array,

    privacyKeyWords: Array, 
    privacySimiWords: Schema.Types.Mixed, 
    privacyStructure: Array, 
    privacyStructureWithKeyWords: Array,

    permissionKeyWords: Array, 
    permissionSimiWords: Schema.Types.Mixed, 
    permissionStructure: Array, 
    permissionStructureWithKeyWords: Array,

    collectionKeyWords: Array, 
    collectionSimiWords: Schema.Types.Mixed, 
    collectionStructure: Array, 
    collectionDataTypes: Schema.Types.Mixed,

    sharingKeyWords: Array, 
    sharingSimiWords: Schema.Types.Mixed, 
    sharingStructure: Array,
    sharingDataTypes: Schema.Types.Mixed,


    securitySentences: Array, 
    privacySentences: Array, 
    permissionSentences: Array, 
    collectionSentences: Array, 
    sharingSentences: Array, 

    perissionType: String, // all, specific, none
    dataItemType: String, // all, specific, none
    purposeType: String, // all, specific, none
    thirdPartyType: String, // all, specific, none

    permissions: [String],
    dataTypes: Schema.Types.Mixed,
    purposes: [String],
    thirdParties: [String]
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

export default mongoose.model("comments", groupSchema);
