const mongoose = require("mongoose");

const UserPerfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    issuedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const UserPerfModel = mongoose.model("UserPerf", UserPerfSchema);
module.exports = UserPerfModel;
