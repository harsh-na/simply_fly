import React, { useState } from "react";
import {
  Grid2,
  TextField,
  MenuItem,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import PassengerSelector from "../Homepage/PassengerSelector";
import { airports } from "../../airports";
import {
  IconButton,
  Popover,
  Select,
  Typography,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import dayjs from "dayjs";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const FlightFilter = ({ onSearch }) => {
  const storedFilters = JSON.parse(localStorage.getItem("filterData")) || {};
  console.log(storedFilters);

  const [filters, setFilters] = useState({
    tripType: storedFilters.tripType || "One Way",
    origin: storedFilters.origin.city || "",
    destination: storedFilters.destination.city || "",
    departureDate: storedFilters.departureDate
      ? dayjs(storedFilters.departureDate, "DD-MM-YYYY").format("YYYY-MM-DD") // Parsing 'DD-MM-YYYY' and formatting to 'YYYY-MM-DD'
      : "",
    returnDate: storedFilters.returnDate
      ? dayjs(storedFilters.returnDate, "DD-MM-YYYY").format("YYYY-MM-DD") // Same for returnDate
      : "",
    passengers: storedFilters.passengers || "economy",
  });

  console.log(storedFilters.tripType);

  // const handleInputChange = (field, value) => {
  //   setFilters((prev) => ({ ...prev, [field]: value }));
  // };

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: field.includes("Date")
        ? dayjs(value).format("YYYY-MM-DD")
        : value, // Ensure date is saved in 'YYYY-MM-DD'
    }));
  };

  const handleSearchClick = () => {
    onSearch(filters);
    console.log(filters);
  };

  const airportsCode = airports.map((item, index) => ({
    id: index + 1,
    name: item.name,
    city: item.city,
    country: item.country,
    iata_code: item.iata_code,
    label: `${item.iata_code} - ${item.name} - ${item.city}`,
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

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

  const totalPassengers =
    filters.passengers.adults +
    filters.passengers.children +
    filters.passengers.infants;

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 item xs={12} sm={3}>
          <FormControl>
            <FormLabel>Trip Type</FormLabel>
            <RadioGroup
              row
              value={filters.tripType}
              onChange={(e) => handleInputChange("tripType", e.target.value)}
            >
              <FormControlLabel
                value="one-way"
                control={<Radio size="small" />}
                label="One Way"
              />
              <FormControlLabel
                value="round-trip"
                control={<Radio size="small" />}
                label="Round Trip"
              />
            </RadioGroup>
          </FormControl>
        </Grid2>

        {/* <Grid2 item xs={12} sm={3}>
          <TextField
            label="Origin"
            value={filters.origin}
            onChange={(e) => handleInputChange("origin", e.target.value)}
            fullWidth
            size="small"
          />
        </Grid2> */}

        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <Autocomplete
            options={airportsCode}
            value={filters.origin}
            onChange={(e, newValue) => handleInputChange("origin", newValue)}
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
              handleInputChange("destination", newValue)
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

        <Grid2 item xs={12} sm={3}>
          <TextField
            label="Departure Date"
            type="date"
            value={filters.departureDate || ""}
            onChange={(e) => handleInputChange("departureDate", e.target.value)}
            format="DD-MM-YYYY"
            fullWidth
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Grid2>

        {filters.tripType === "round-trip" && (
          <Grid2 item xs={12} sm={3}>
            <TextField
              label="Return Date"
              type="date"
              value={filters.returnDate || ""}
              onChange={(e) => handleInputChange("returnDate", e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid2>
        )}

        <Grid2 size={{ sm: 4, md: 2.5 }}>
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
                        onClick={() => handlePassengerChange(type, "decrement")}
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{filters.passengers[type]}</Typography>
                      <IconButton
                        onClick={() => handlePassengerChange(type, "increment")}
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

        <Grid2 size={{ sm: 4, md: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default FlightFilter;
