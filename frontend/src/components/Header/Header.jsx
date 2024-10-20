import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

const Header = () => {
    const cookies = new Cookies();
    const [name, setName] = useState(sessionStorage.getItem("name"));
    const navigate = useNavigate();
    const token = cookies.get("token")
        ? cookies.get("token")
        : sessionStorage.getItem("token");

    const navigateSignIn = () => {
        navigate("/user/signin");
    };
    const navigateSignUp = () => {
        navigate("/user/signup");
    };
    const navigateSignOut = () => {
        sessionStorage.clear();
        cookies.remove("token");
        setName("");
        navigate("/");
    };

    useEffect(() => {
        const getUser = async () => {
            if (token) {
                try {
                    const res = await axios.get(
                        "http://localhost:8080/v1/api/userbyId",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    sessionStorage.setItem("name", res.data.name);
                    sessionStorage.setItem("email", res.data.email);
                    sessionStorage.setItem("isAdmin", res.data.isAdmin);
                    sessionStorage.setItem("token", token);
                    setName(res.data.name);
                    if (res.data.isAdmin) {
                        navigate("/admin");
                    } else {
                        navigate("/user");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getUser();
    }, [token, navigate]);

    const ControlButtons = (token) => {
        if (!token) {
            return (
                <ButtonGroup sx={{ marginLeft: "auto" }}>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={navigateSignIn}
                    >
                        SignIn
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={navigateSignUp}
                    >
                        SignUp
                    </Button>
                </ButtonGroup>
            );
        } else {
            return (
                <ButtonGroup sx={{ marginLeft: "auto" }}>
                    <Button
                        variant="text"
                        color="inherit"
                        disableElevation="true"
                        disableRipple="true"
                    >
                        <Typography variant="h10">Welcome, {name}</Typography>
                    </Button>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={navigateSignOut}
                    >
                        SignOut
                    </Button>
                </ButtonGroup>
            );
        }
    };
    return (
        <div>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography variant="h6">CertiCheck</Typography>
                    {ControlButtons(token)}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
