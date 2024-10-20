const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const upload = require("./controllers/uploader");
const authentication = require("./middleware/authentication");
const db = require("./config/db");
const sheetparser = require("./controllers/sheetparser");
const authControl = require("./controllers/authController");
const getAll = require("./controllers/getAll");
const getData = require("./controllers/getData");
const certificate = require("../frontend/src/components/DownloadPDF/certificate");
const getRecords = require("./controllers/getRecords");
const UploadRecord = require("./models/UploadRecord");
const getUserById = require("./controllers/getUserbyID");

db();
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
    res.send("Hello World!");
});
v1Router.get("/admin", (req, res) => {
    res.send("Admin Page");
});
v1Router.get("/user", (req, res) => {
    res.send("User Page");
});
v1Router.get("/all", (req, res) => {
    getAll.getAllUser(req, res);
});
v1Router.get("/allperf", (req, res) => {
    getAll.getAllPerf(req, res);
});
v1Router.post("/user/signup", async (req, res) => {
    authControl.signUp(req, res, false);
});
v1Router.post("/admin/signup", async (req, res) => {
    authControl.signUp(req, res, true);
});
v1Router.post("/user/signin", async (req, res) => {
    authControl.signIn(req, res, false);
});
v1Router.post("/admin/signin", async (req, res) => {
    authControl.signIn(req, res, true);
});
v1Router.get("/user/data", authentication, (req, res) => {
    getData(req, res);
});
v1Router.get("/certificate", (req, res) => {
    res.send(certificate());
});
v1Router.get("/records", authentication, async (req, res) => {
    getRecords(req, res);
});
v1Router.get("/userbyId", authentication, (req, res) => {
    getUserById(req, res);
});
v1Router.post(
    "/upload",
    authentication,
    upload.single("file"),
    async (req, res) => {
        if (req.user.admin === false) {
            res.status(403).json({ message: "Unauthorized" });
        } else {
            try {
                const record = new UploadRecord({
                    filename: req.user.userId + "-" + req.file.originalname,
                    uploadedBy: req.user.userId,
                });
                record.save();
                res.status(200).json({ message: "Upload Successful" });
            } catch (error) {
                res.status(400).json({
                    message: "Upload Not Successful",
                    error: error.message,
                });
            }
        }
    }
);
v1Router.post("/parse", authentication, (req, res) => {
    sheetparser(req, res);
});

app.use("/v1/api", v1Router);
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
