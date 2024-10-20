import {
    Table,
    TableContainer,
    Typography,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Button,
} from "@mui/material";
import axios from "axios";
import { React, useState, useEffect } from "react";
import certificate from "../components/DownloadPDF/certificate";
import downloadPDF from "../components/DownloadPDF/DownloadPDF";
import { useNavigate } from "react-router-dom";

const StudentDash = () => {
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:8080/v1/api/user/data", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    const handleDownload = (id, name, domain, startDate, endDate) => {
        const htmlData = certificate(name, domain, startDate, endDate, id);
        downloadPDF(htmlData, id);
    };

    const rowEntry = (val) => {
        return (
            <TableRow key={val._id}>
                <TableCell sx={{ textAlign: "center", width: "20%" }}>
                    {val._id}
                </TableCell>
                <TableCell sx={{ textAlign: "center", width: "20%" }}>
                    {val.domain}
                </TableCell>
                <TableCell sx={{ textAlign: "center", width: "20%" }}>
                    {val.startDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center", width: "20%" }}>
                    {val.endDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center", width: "20%" }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                            handleDownload(
                                val._id,
                                data[0].name,
                                val.domain,
                                val.startDate,
                                val.endDate
                            )
                        }
                    >
                        Download
                    </Button>
                </TableCell>
            </TableRow>
        );
    };
    const isAdmin = sessionStorage.getItem("isAdmin");

    if (!token || isAdmin !== "false") {
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
                sx={{ marginTop: 10, marginLeft: 15, textAlign: "left" }}
            >
                My Certificates
            </Typography>
            <TableContainer>
                <Table
                    sx={{
                        width: "80%",
                        margin: "0 auto",
                        marginTop: "20px",
                        border: "1px solid #007bff",
                    }}
                >
                    <TableHead sx={{ background: "#c8dbfa" }}>
                        <TableRow>
                            <TableCell
                                sx={{ textAlign: "center", width: "20%" }}
                            >
                                Certificate ID
                            </TableCell>
                            <TableCell
                                sx={{ textAlign: "center", width: "20%" }}
                            >
                                Domain
                            </TableCell>
                            <TableCell
                                sx={{ textAlign: "center", width: "20%" }}
                            >
                                Start Date
                            </TableCell>
                            <TableCell
                                sx={{ textAlign: "center", width: "20%" }}
                            >
                                End Date
                            </TableCell>
                            <TableCell
                                sx={{ textAlign: "center", width: "20%" }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{data.map((row) => rowEntry(row))}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StudentDash;
