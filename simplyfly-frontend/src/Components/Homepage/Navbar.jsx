import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import LoginMenu from "./LoginMenu";
import TextOnImage from "./TextOnImage";
import { Box, Card, CardContent } from "@mui/material";
import About from "./About";
import { Link } from "react-router-dom";

const Navbar = () => {
  // colors: "#F8EDED #EEEEEE #EEE2DE #E4DCCF"

  const containerStyle = {
    backgroundColor: "#E4DCCF",
    // position:"fixed",
    // top:0
    //opacity:0.4
  };

  return (
    <>
      <Grid2
        container
        alignItems="center"
        justifyContent="space-around"
        p={1}
        // spacing={1}
        sx={containerStyle}
      >
        <Grid2 size={{ xs: 1, sm: 1, md: 1 }}>
          <img src="/assets/logo.png" alt="company logo" height={70} />
        </Grid2>

        <Grid2 size={{ xs: 1, sm: 5, md: 3 }}>
          <Grid2 container direction="column">
            <Grid2>
              <Grid2 container justifyContent="space-around">
                {/* <nav>

                </nav> */}
                <a href="/" style={{ textDecoration: "none" }}>
                  <Typography variant="body1" fontWeight="600">
                    HOME
                  </Typography>
                </a>
                {["ABOUT", "FAQ", "TEAM"].map((link) => (
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                    key={link}
                  >
                    <Typography variant="body1" fontWeight="600">
                      {link}
                    </Typography>
                  </a>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2>
          <Grid2 container justifyContent="space-around" spacing={2}>
            <Grid2>
              <Link to="/signin">
                <Button variant="text" disableElevation>
                  Login
                </Button>
              </Link>
            </Grid2>

            <Grid2>
              <Link to="/signup">
                <Button variant="contained" disableElevation>
                  Register
                </Button>
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Navbar;
