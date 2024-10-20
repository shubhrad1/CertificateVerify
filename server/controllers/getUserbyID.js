const User = require("../models/User");

const getUserbyID = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = getUserbyID;
