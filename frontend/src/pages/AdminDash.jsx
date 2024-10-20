import {
    TableContainer,
    TableHead,
    Typography,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    Button,
    ButtonGroup,
} from "@mui/material";
import { React, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import UploadIcon from "@mui/icons-material/Upload";
import DoneIcon from "@mui/icons-material/Done";

const AdminDash = () => {
    const [files, setFiles] = useState([]);
    const [records, setRecords] = useState([]);
    const [uploadTrigger, setUploadTrigger] = useState(1);
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:8080/v1/api/records", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setRecords(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [uploadTrigger, token]);

    const issueCertificate = (fileName, id) => {
        axios
            .post(
                `http://localhost:8080/v1/api/parse`,
                {
                    fileName: fileName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Certificates Issued Successfully");
                    handlePrinted(id);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePrinted = (id) => {
        axios
            .post(
                `http://localhost:8080/v1/api/updatePrinted`,
                {
                    id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setUploadTrigger(uploadTrigger + 1);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const recordRow = (record) => {
        const fileName = record.filename;
        const uploadDate = record.timeUploaded;
        const id = record._id;
        const isPrinted = record.printed;
        return (
            <TableRow>
                <TableCell sx={{ textAlign: "center", width: "33%" }}>
                    {fileName}
                </TableCell>
                <TableCell sx={{ textAlign: "center", width: "33%" }}>
                    {uploadDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center", width: "33%" }}>
                    {isPrinted ? (
                        <Button
                            variant="outlined"
                            color="success"
                            endIcon={<DoneIcon />}
                            disabled
                        >
                            Issued
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => issueCertificate(fileName, id)}
                            endIcon={<SendIcon />}
                        >
                            Issue
                        </Button>
                    )}
                </TableCell>
            </TableRow>
        );
    };

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const stage = (files) => {
        const filesToUpload = files;

        return (
            <div>
                <Paper
                    sx={{
                        width: "80%",
                        margin: "0 auto",
                        textAlign: "left",
                        padding: "20px",
                    }}
                >
                    <Typography>Files To Upload:</Typography>
                    {filesToUpload.map((file, index) =>
                        stagerow(file.name, index)
                    )}
                </Paper>
            </div>
        );
    };

    const handleDelete = (delidx) => {
        return () => {
            setFiles((prevFiles) => {
                return prevFiles.filter((file, index) => index !== delidx);
            });
        };
    };

    const handleUpload = async (idx) => {
        const file = files[idx];
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("http://localhost:8080/v1/api/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(async (res) => {
                setUploadTrigger(uploadTrigger + 1);
                setFiles((prevFiles) => {
                    return prevFiles.filter((file, index) => index !== idx);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const stagerow = (filename, index) => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "3px",
                }}
            >
                <Typography>{filename}</Typography>

                <ButtonGroup size="small">
                    <Button
                        variant="contained"
                        color="success"
                        value={index}
                        onClick={() => handleUpload(index)}
                        endIcon={<UploadIcon />}
                    >
                        Upload
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        value={index}
                        onClick={handleDelete(index)}
                        endIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </div>
        );
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                ".xlsx",
            "application/vnd.ms-excel": ".xls",
        },
    });

    const dropzoneStyle = {
        width: "80%",
        border: "2px dashed #007bff",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "4px",
        margin: "0 auto",
    };
    const isAdmin = sessionStorage.getItem("isAdmin");

    if (!token || isAdmin !== "true") {
        return navigate("/");
    }

    return (
        <div>
            <Typography
                variant="h3"
                sx={{ marginTop: 10, marginLeft: 2, textAlign: "left" }}
            >
                Dashboard
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    marginTop: 2,
                    marginLeft: 4,
                    marginBottom: 2,
                    textAlign: "left",
                }}
            >
                Upload SpreadSheet
            </Typography>
            <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </div>
            {stage(files)}
            <Typography
                variant="h5"
                sx={{
                    marginTop: 2,
                    marginLeft: 4,
                    marginBottom: 2,
                    textAlign: "left",
                }}
            >
                My Uploads
            </Typography>
            <div
                style={{
                    textAlign: "center",
                    width: "80%",
                    margin: "0 auto",
                    marginTop: "20px",
                    border: "1px solid #007bff",
                    borderRadius: "4px",
                }}
            >
                <TableContainer component="paper">
                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: "#c8dbfa",
                            }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{ textAlign: "center", width: "33%" }}
                                >
                                    File Name
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: "center", width: "33%" }}
                                >
                                    Upload Date
                                </TableCell>
                                <TableCell
                                    sx={{ textAlign: "center", width: "33%" }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => recordRow(record))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdminDash;
