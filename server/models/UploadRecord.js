const mongoose = require("mongoose");

const UploadRecordSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    timeUploaded: {
        type: Date,
        default: Date.now,
    },
    printed: {
        type: Boolean,
        default: false,
    },
});

const UploadRecord = mongoose.model("UploadRecord", UploadRecordSchema);
module.exports = UploadRecord;
