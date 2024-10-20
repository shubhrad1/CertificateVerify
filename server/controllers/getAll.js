const User = require("../models/User");

const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAllPerf = async (req, res) => {
    try {
        const users = await UserPerf.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = { getAllUser, getAllPerf };
