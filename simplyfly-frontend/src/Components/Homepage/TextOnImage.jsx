import React, { useEffect, useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import airportsDropdown from "../../airportsDropdown";
import FlightSearch from "./FlightSearch";

const TextOnImage = () => {
  // useEffect(() => {
  //     fetch("https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json").
  //         then((res) => res.json())
  //         .then((temp) => setAirports(temp))
  //         .catch((e) => console.log(e))
  // },
  //     [])

  // const [airports,setAirports] = useState([])
  return (
    <Box
      sx={{
        position: "relative",
        display: "block",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="assets/home-bg.jpg"
        alt="Background"
        sx={{
          width: "100%",
          height: "50%",
          display: "block",
        }}
      />

      {/* Text Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          SimplyFly
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "normal",
            textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            marginTop: "8px", // Space between the lines
          }}
        >
          Taking you places, one ticket at a time
        </Typography>

        <FlightSearch link="/flightListings" />
      </Box>
    </Box>
  );
};

export default TextOnImage;
