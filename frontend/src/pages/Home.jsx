import { Typography } from "@mui/material";
import React from "react";
const Home = () => {
    return (
        <div style={{ textAlign: "left" }}>
            <Typography
                variant="h1"
                sx={{ marginTop: "50px", padding: "30px" }}
            >
                CertiCheck
            </Typography>
            <Typography variant="h5" sx={{ padding: "30px" }}>
                Manage Certificates with ease!
            </Typography>
        </div>
    );
};

export default Home;
