const UserPerf = require("../models/UserPerf");
const getData = async (req, res) => {
    if (req.user.admin === true) {
        res.status(403).json({ message: "Unauthorized" });
    } else {
        const data = await UserPerf.find({ issuedTo: req.user.userId });
        res.status(200).json(data);
    }
};

module.exports = getData;
