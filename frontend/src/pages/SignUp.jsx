import React, { useState } from "react";
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill in all the fields");
            return;
        }

        if (isAdmin) {
            axios
                .post("http://localhost:8080/v1/api/admin/signup", {
                    name,
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res);
                    alert("Admin created successfully");
                    setName("");
                    setEmail("");
                    setPassword("");
                    navigate("/signin");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error creating admin");
                });
        } else {
            axios
                .post("http://localhost:8080/v1/api/user/signup", {
                    name,
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res);
                    alert("User created successfully");
                    setName("");
                    setEmail("");
                    setPassword("");
                    navigate("/signin");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error creating user");
                });
        }
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
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
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
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
