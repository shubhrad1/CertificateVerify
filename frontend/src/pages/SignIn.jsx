import React, { useState } from "react";
import {
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Box,
    Typography,
    Container,
    Switch,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(true);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["token"]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill in all the fields");
            return;
        }
        if (isAdmin) {
            axios
                .post("http://localhost:8080/v1/api/admin/signin", {
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res);
                    alert("Admin signed in successfully");
                    setEmail("");
                    setPassword("");
                    sessionStorage.setItem("token", res.data.token);
                    if (remember) {
                        if (remember) {
                            setCookie("token", res.data.token, {
                                maxAge: 60 * 60 * 24 * 7,
                            });
                            cookies.token = res.data.token;
                        }
                    }
                    navigate("/admin");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error signing in admin");
                });
        } else {
            axios
                .post("http://localhost:8080/v1/api/user/signin", {
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res);
                    alert("User signed in successfully");
                    setEmail("");
                    setPassword("");
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("name", res.data.name);
                    sessionStorage.setItem("email", res.data.email);
                    sessionStorage.setItem("isAdmin", res.data.isAdmin);
                    if (remember) {
                        if (remember) {
                            setCookie("token", res.data.token, {
                                maxAge: 60 * 60 * 24 * 7,
                            });
                            cookies.token = res.data.token;
                        }
                    }
                    navigate("/user");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error signing in user");
                });
        }
    };

    const handleRemember = () => {
        setRemember(!remember);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            label="Admin"
                            defaultChecked="false"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </form>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                value={remember}
                                onClick={handleRemember}
                            />
                        }
                        label="Remember me"
                    />
                    <Link
                        variant="body2"
                        onClick={() => {
                            navigate("/user/signup");
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;
