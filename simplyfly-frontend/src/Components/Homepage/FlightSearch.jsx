import { Grid2, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Link, Navigate, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import dayjs from "dayjs";
import { airports } from "../../airports";
import FlightFilter from "../Listings/FlightFilter";

import { IconButton, Popover, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";

const FlightSearch = () => {
  const StyledWrapper = styled.div`
    .button {
      background: linear-gradient(140.14deg, #ec540e 15.05%, #d6361f 114.99%)
          padding-box,
        linear-gradient(142.51deg, #ff9465 8.65%, #af1905 88.82%) border-box;
      border-radius: 7px;
      border: 2px solid transparent;

      text-shadow: 1px 1px 1px #00000040;
      box-shadow: 8px 8px 20px 0px #45090059;

      padding: 15px 60px;
      line-height: 20px;
      cursor: pointer;
      transition: all 0.5s;
      color: white;
      font-size: 18px;
      font-weight: 500;
    }

    .button:hover {
      box-shadow: none;
      opacity: 80%;
    }
  `;

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate=useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log(filters.passengers);
  };

  const handlePassengerChange = (type, action) => {
    setFilters((prev) => {
      const newCount =
        action === "increment"
          ? prev.passengers[type] + 1
          : Math.max(0, prev.passengers[type] - 1); // Prevent negative counts
      return {
        ...prev,
        passengers: {
          ...prev.passengers,
          [type]: newCount,
        },
      };
    });
  };

  const [filters, setFilters] = useState({
    tripType: "",
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });

  useEffect(() => {
    console.log("Filters updated:", filters);
  }, [filters]);

  const totalPassengers =
    filters.passengers.adults +
    filters.passengers.children +
    filters.passengers.infants;

  const handleChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value, // Update the specific field
    }));
  };

  const handleSearchClick = () => {
    // onSearch(filters);
    console.log(filters);
    localStorage.setItem("filterData", JSON.stringify(filters));
  };

  // const handleSearchClick = async (filters) => {
  //   // const { origin, destination, tripType, departureDate, returnDate, numOfTravellers } = filters;
  //   console.log(filters);
  //   const origin=filters.origin;
  //   const destination = filters.destination;
  //   const tripType = filters.tripType;  // Example: "one-way" or "round-trip"
  //   const departureDate = filters.departureDate;
  //   const returnDate = filters.returnDate;
  //   console.log("harshit")
  //   const numOfTravellers =  filters.passengers.adults +
  //   filters.passengers.children +
  //   filters.passengers.infants;
  //   console.log("harshit1")
  //   try {
  //     // Make sure you're accessing `.city` if `origin` and `destination` are objects
  //     const response = await axios.get("http://localhost:9000/api/flights/search", {
  //       params: {
  //         tripType: tripType,
  //         origin: origin.city,  // Access city property if origin is an object
  //         destination: destination.city,  // Access city property if destination is an object
  //         dates: `${departureDate},${returnDate}`,  // List of dates as a comma-separated string
  //         numOfTravellers: numOfTravellers,
  //       },
  //     });
  
  //     console.log("Filtered flights:", response.data);
  //     setFilteredFlights(response.data);  // Update the filtered flights state
  //     navigate("/flightListings")
  //   } catch (error) {
  //     console.error("Error fetching flights:", error);
  //     alert("Failed to search for flights. Please try again.");
  //   }
  // };

  const airportsCode = airports.map((item, index) => ({
    id: index + 1,
    name: item.name,
    city: item.city,
    country: item.country,
    iata_code: item.iata_code,
    label: `${item.iata_code} - ${item.name} - ${item.city}`,
  }));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 2 }}>
          <Grid2 container spacing={2} alignItems="center">
            {/* Trip Type Select */}
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl
                fullWidth
                sx={{
                  minWidth: 120,
                  backgroundColor: "white",
                  "&.MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E38E49", // Focused label color
                    fontWeight: "1000",
                    fontSize: "large",
                    alignItems: "center",
                  },
                }}
              >
                <InputLabel id="trip-type-label">Trip Type</InputLabel>
                <Select
                  labelId="trip-type-label"
                  value={filters.tripType}
                  onChange={(e) => handleChange("tripType", e.target.value)}
                  label="Trip Type"
                  renderValue={(selected) => {
                    if (selected === "One Way") {
                      return (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TrendingFlatOutlinedIcon sx={{ mr: 1 }} />
                          One Way
                        </Box>
                      );
                    }
                    if (selected === "Round Trip") {
                      return (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <RepeatIcon sx={{ mr: 1 }} />
                          Round Trip
                        </Box>
                      );
                    }
                    return null;
                  }}
                >
                  <MenuItem
                    value="One Way"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <TrendingFlatOutlinedIcon sx={{ mr: 1 }} />
                    One Way
                  </MenuItem>
                  <MenuItem
                    value="Round Trip"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <RepeatIcon sx={{ mr: 1 }} />
                    Round Trip
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={{ sm: 4, md: 4 }}>
              <div>
                {/* Select as Trigger */}
                <Select
                  size="small"
                  value={filters.passengers}
                  onClick={handleOpen}
                  displayEmpty
                  renderValue={() => (
                    <Box display="flex" alignItems="center">
                      <PersonIcon style={{ marginRight: 4 }} />
                      {totalPassengers} Passenger
                      {totalPassengers > 1 ? "s" : ""}
                    </Box>
                  )}
                  sx={{ p: 1 }}
                  style={{
                    cursor: "pointer",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                    backgroundColor: "white",
                  }}
                  // MenuProps={{ disableScrollLock: true }} // Disable dropdown menu behavior
                  inputProps={{ readOnly: true }} // Prevent default dropdown behavior
                />

                {/* Popover for Passenger Details */}
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Box p={2} width={250}>
                    {["adults", "children", "infants"].map((type) => (
                      <Box
                        key={type}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <IconButton
                            onClick={() =>
                              handlePassengerChange(type, "decrement")
                            }
                            size="small"
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{filters.passengers[type]}</Typography>
                          <IconButton
                            onClick={() =>
                              handlePassengerChange(type, "increment")
                            }
                            size="small"
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                    <Typography align="center">
                      Total: {totalPassengers} Passenger
                      {totalPassengers > 1 ? "s" : ""}
                    </Typography>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      fullWidth
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Done
                    </Button>
                  </Box>
                </Popover>
              </div>
            </Grid2>

            {/* Date Pickers */}
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <DatePicker
                label="Departure date"
                value={
                  filters.departureDate
                    ? dayjs(filters.departureDate, "DD-MM-YYYY")
                    : null
                }
                onChange={(newDate) =>
                  handleChange(
                    "departureDate",
                    newDate ? dayjs(newDate).format("DD-MM-YYYY") : ""
                  )
                }
                // minDate={new Date()}
                shouldDisableDate={(date) => date.isBefore(new Date(), "day")}
                renderInput={(params) => <TextField fullWidth {...params} />}
                sx={{
                  backgroundColor: "white",
                  "&.MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E38E49", // Focused label color
                    fontWeight: "1000",
                    fontSize: "large",
                    alignItems: "center",
                  },
                }}
              />
            </Grid2>

            {filters.tripType === "Round Trip" && (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                <DatePicker
                  label="Return date"
                  value={
                    filters.returnDate
                      ? dayjs(filters.returnDate, "DD-MM-YYYY")
                      : null
                  }
                  onChange={(newDate) =>
                    handleChange(
                      "returnDate",
                      newDate ? dayjs(newDate).format("DD-MM-YYYY") : ""
                    )
                  }
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  shouldDisableDate={(date) => date.isBefore(new Date(), "day")}
                  sx={{
                    backgroundColor: "white",
                    "&.MuiInputLabel-root": {
                      color: "gray", // Default label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#E38E49", // Focused label color
                      fontWeight: "1000",
                      fontSize: "large",
                      alignItems: "center",
                    },
                  }}
                />
              </Grid2>
            )}
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                options={airportsCode}
                value={filters.origin}
                onChange={(e, newValue) => handleChange("origin", newValue)}
                // fullWidth
                // sx={{ width: 300, backgroundColor: "white" }}
                sx={{
                  backgroundColor: "white",
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E38E49", // Focused label color
                    fontWeight: "1000",
                    fontSize: "large",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FlightTakeoffIcon sx={{ mr: 1 }} />
                        Origin
                      </Box>
                    }
                  />
                )}
                size="medium"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                options={airportsCode}
                value={filters.destination}
                onChange={(e, newValue) =>
                  handleChange("destination", newValue)
                }
                fullWidth
                // sx={{ width: 300, backgroundColor: "white" }}
                sx={{
                  backgroundColor: "white",
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E38E49", // Focused label color
                    fontWeight: "1000",
                    fontSize: "large",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FlightLandIcon sx={{ mr: 0.5 }} />
                        Destination
                      </Box>
                    }
                  />
                )}
                size="medium"
              />
            </Grid2>

            <Grid2>
              <StyledWrapper>
                <Link to="/flightListings">
                  <button onClick={handleSearchClick} className="button">
                    Search
                  </button>
                </Link>
              </StyledWrapper>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default FlightSearch;
