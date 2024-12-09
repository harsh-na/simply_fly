import {React,useState} from "react";
import {
  Card,
  Grid2,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import "./SignUp.css";
import Navbar from "../Homepage/Navbar";
import axios from "axios";
import {Link} from "react-router-dom"
const SignUp = () => {
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [gender, setGender] = useState();
  let [contact, setContact] = useState();
  let [address, setAddress] = useState();
  let [dob, setDob] = useState();
  let [role, setRole] = useState();

  const signup = () => {
    console.log("Signup initiated");
    let user = {
      name,
      email,
      password,
      gender,
      contact,
      address,
      dateOfBirth: dob,
       role,
    };
    console.log("Payload to API:", user);

    axios
      .post("http://localhost:9000/api/users/signup", user)
      .then(() => alert("User added"))
      .catch((e) => {
        if (e.response) {
          console.error("Response error:", e.response.data, e.response.status);
        } else {
          console.error("Request error:", e.message);
        }
      });
  };
  return (
    <>
      <Navbar />
      <Box className="signup-container">
        <Card className="signup-card">
          <Grid2 container spacing={2} className="signup-grid-container">
            {/* Image Section */}
            <Grid2 item xs={6} className="signup-image-container">
              <img
                src="assets/signin-img.jpg"
                alt="Sign Up Illustration"
                className="signup-image"
              />
            </Grid2>

            {/* Form Section */}
            <Grid2 item xs={6} className="signup-form-container">
              <Typography
                variant="h4"
                className="signup-header"
                sx={{ marginBottom: "20px" }}
              >
                Sign Up
              </Typography>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                placeholder="Enter your Name"
                className="signup-textfield"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Enter your email"
                className="signup-textfield"
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: "16px" }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Enter your password"
                className="signup-textfield"
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginTop: "16px" }}
              />
              <TextField
                fullWidth
                label="Contact"
                variant="outlined"
                type="tel"
                placeholder="Enter your contact number"
                className="signup-textfield"
                onChange={(e) => setContact(e.target.value)}
                style={{ marginTop: "16px" }}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                type="text"
                placeholder="Enter your address"
                className="signup-textfield"
                onChange={(e) => setAddress(e.target.value)}
                style={{ marginTop: "16px" }}
              />
              <TextField
                fullWidth
                label="Date of Birth"
                variant="outlined"
                type="date"
                className="signup-textfield"
                onChange={(e) => setDob(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginTop: "16px" }}
              />

              <Grid2 container spacing={2} className="signup-row">
                {/* Gender Field */}
                <Grid2 item xs={6} className="signup-half">
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    variant="outlined"
                    className="signup-textfield"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid2>

                {/* Role Field */}
                <Grid2 item xs={6} className="signup-half">
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    variant="outlined"
                    className="signup-textfield"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="agency">Agency</MenuItem>
                  </TextField>
                </Grid2>
              </Grid2>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="signup-button"
                style={{ marginTop: "24px" }}
                onClick={signup}
              >
                Sign Up
              </Button>
              <Typography
                variant="body2"
                className="signup-footer"
                sx={{ marginTop: "10px" }}
              >
                Already have an account?{" "}
                <Link to="/signin" className="signup-link">Sign In</Link>
              </Typography>
            </Grid2>
          </Grid2>
        </Card>
      </Box>
    </>
  );
};

export default SignUp;
