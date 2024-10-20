const UserPerf = require("../models/UserPerf");
const template = require("../../frontend/src/components/DownloadPDF/certificate");

const makePDF = (req, res) => {
    const certificateID = req.body.certificateID;
    const user_data = UserPerf.findOne({ _id: certificateID });
    const certificate = template(
        user_data.name,
        user_data.domain,
        user_data.startDate,
        user_data.endDate,
        certificateID
    );
    if (!user_data) {
        res.status(404).json({ message: "Certificate not found" });
    } else {
        res.status(200).json({ message: "PDF generated" });
    }
};
