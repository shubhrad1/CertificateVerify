const UploadRecord = require("../models/UploadRecord");

const getRecords = async (req, res) => {
    if (req.user.admin === false) {
        res.status(403).json({ message: "Unauthorized" });
    } else {
        try {
            const records = await UploadRecord.find({
                uploadedBy: req.user.userId,
            });
            res.status(200).json(records);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = getRecords;
