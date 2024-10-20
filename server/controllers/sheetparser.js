const xlsx = require("xlsx");
const moment = require("moment");
const UserPerfModel = require("../models/UserPerf");
const User = require("../models/User");

const excelSerialToJSDate = (serial) => {
    return new Date((serial - 25569) * 86400 * 1000);
};

const sheetParser = async (req, res) => {
    if (req.user.admin === false) {
        res.status(403).json({ message: "Unauthorized" });
    } else {
        const filename = req.body.fileName;

        const wb = xlsx.readFile("uploads/" + filename);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(ws);

        const selfId = req.user.userId;

        for (const item of data) {
            const user = await User.findOne({
                email: item["Email"],
            });

            if (!user) {
                continue;
            }

            const startDate = excelSerialToJSDate(item.StartDate);
            const endDate = excelSerialToJSDate(item.EndDate);

            item.StartDate = moment(startDate).format("DD-MM-YYYY");
            item.EndDate = moment(endDate).format("DD-MM-YYYY");
            const userId = user._id;
            const userperf = new UserPerfModel({
                name: item.Name,
                email: item.Email,
                domain: item.Domain,
                startDate: item.StartDate,
                endDate: item.EndDate,
                issuedby: selfId,
                issuedTo: userId,
            });

            try {
                const userperfSaved = await userperf.save();
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
        res.status(200).json({ message: "Data saved" });
    }
};

module.exports = sheetParser;
