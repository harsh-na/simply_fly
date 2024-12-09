import React, { useState } from "react";
import { Card, Grid2, TextField, Button, Typography, Box } from "@mui/material";
import "./SignIn.css";
import Navbar from "../Homepage/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  const navigate = useNavigate();

  const signin = () => {
    let login = { email, password };
    // React Router's hook for navigation

    axios
      .post("http://localhost:9000/api/users/login", login)
      .then((res) => {
        let token = res.data.jwt; // JWT from the response
        let role = res.data.role; // Role from the response

        // Store the token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate("/admin/dashboard"); // Navigate to the admin dashboard
        } else if (role === "USER") {
          navigate("/"); // Navigate to the user dashboard
        } else if (role === "agency") {
          navigate("/flightOwner/home"); // Navigate to default home or error page
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <>
      <Navbar />
      <Box className="signin-container">
        <Card className="signin-card">
          <Grid2 container spacing={2} className="signin-grid-container">
            {/* Image Section */}
            <Grid2 item xs={6} className="signin-image-container">
              <img
                src="assets/signin-img.jpg"
                alt="Sign In Illustration"
                className="signin-image"
              />
            </Grid2>

            {/* Form Section */}
            <Grid2 item xs={6} className="signin-form-container">
              <Typography
                variant="h4"
                className="signin-header"
                sx={{ marginBottom: "20px" }}
              >
                Sign In
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Enter your email"
                className="signin-textfield"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Enter your password"
                className="signin-textfield"
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginTop: "16px" }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="signin-button"
                style={{ marginTop: "24px" }}
                onClick={signin}
              >
                Sign In
              </Button>
              <Typography
                variant="body2"
                className="signin-footer"
                sx={{ marginTop: "10px" }}
              >
                Don't have an account?{" "}
                <Link to="/signup" className="signin-link">
                  Sign Up
                </Link>
              </Typography>
            </Grid2>
          </Grid2>
        </Card>
      </Box>
    </>
  );
};

export default SignIn;
