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
});

const UploadRecord = mongoose.model("UploadRecord", UploadRecordSchema);
module.exports = UploadRecord;
