import { Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/signin");
    };
    const navigateToSignup = () => {
        navigate("/signup");
    };
    return (
        <div style={{ textAlign: "left" }}>
            <Typography
                variant="h1"
                sx={{ marginTop: "50px", padding: "30px" }}
            >
                CertiCheck
            </Typography>
            <Typography variant="h3" sx={{ paddingLeft: "30px" }}>
                Manage Certificates with ease!
            </Typography>
            <Typography variant="h4" sx={{ padding: "30px" }}>
                About
            </Typography>
            <Typography variant="h4" sx={{ paddingLeft: "30px" }}>
                Easily issue certificates with one click! Upload data in .xlsx
                or .xls format.
                <br /> CertiCheck will automatically generate certificates for
                you.
            </Typography>
            <Typography variant="h4" sx={{ padding: "30px" }}>
                Get Started Now!
            </Typography>
            <div sx={{ marginLeft: "30px" }}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ marginLeft: "30px" }}
                    onClick={navigateToLogin}
                >
                    Login
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ margin: "10px" }}
                    onClick={navigateToSignup}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default Home;
