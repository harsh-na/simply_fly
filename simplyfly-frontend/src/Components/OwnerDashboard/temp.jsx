// import * as React from "react";
// import PropTypes from "prop-types";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import { Grid, Grid2, TextField, Button, Paper } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@mui/material";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

// export default function ManageFlight() {
//   const theme = useTheme();
//   const [value, setValue] = useState(0);
//   const [flightId, setFlightId] = useState("");
//   const [flights, setFlights] = useState([]); // To store fetched flight data
//   const [error, setError] = useState(""); // For error handling

//   const [flightData, setFlightData] = useState({
//     companyId: "",
//     flightNo: "",
//     origin: "",
//     destination: "",
//     totalSeats: "",
//     availableSeats: "",
//     seatTypes: "",
//     fare: "",
//     baggageInfo: "",
//     bookingId: "",
//     dates: "",
//     timings: "",
//     // seats: '',
//     rows: "",
//     columns: "",
//   });
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const [flightIdToUpdate, setFlightIdToUpdate] = useState("");

//   const [updateFields, setUpdateFields] = useState({});


//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFlightData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const formatDates = (datesString) => {
//     return datesString.split(",").map((date) => {
//       const [day, month, year] = date.trim().split("-");
//       return `${year}-${month}-${day}`; // Convert to yyyy-mm-dd
//     });
//   };

//   const handleAddFlight = async () => {
//     try {
//       const { rows, columns, timings, dates, ...otherData } = flightData;
//       const totalSeats = rows * columns;
//       const seats = {};

//       // Generate default seat map
//       for (let row = 1; row <= rows; row++) {
//         for (let col = 1; col <= columns; col++) {
//           const seatNumber = `${String.fromCharCode(64 + row)}${col}`;
//           seats[seatNumber] = true; // Default all seats to available
//         }
//       }

//       // Convert timings from comma-separated string to JSON array
//       const parsedTimings = timings
//         ? timings.split(",").map((entry) => {
//             const [day, time] = entry.split(":").map((str) => str.trim());
//             return { [day]: time };
//           })
//         : [];

//       const formattedData = {
//         ...otherData,
//         totalSeats,
//         availableSeats: totalSeats,
//         dates: formatDates(dates),
//         timings: parsedTimings,
//         seats,
//       };

//       const response = await axios.post(
//         "http://localhost:9000/api/flights/add",
//         formattedData
//       );
//       alert("Flight added successfully!");
//     } catch (error) {
//       console.error("Error adding flight:", error);
//       alert("Failed to add flight. Please try again.");
//     }
//   };

//   const handleGetFlight = async (companyId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:9000/api/flights/getAll/${companyId}`
//       );
//       setFlights(response.data); // Save the response data in state
//       setError(""); // Clear any previous errors
//     } catch (error) {
//       console.error("Error fetching flight by ID:", error);
//       setFlights([]); // Clear the flight list
//       setError("Unable to fetch flights. Please check the Company ID.");
//     }
//   };

//   const handleFetchFlightData = async (flightId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:9000/api/flights/get/${flightId}`
//       );
//       setFlightData(response.data); // Populate flight data in the form
//       setUpdateFields(response.data); // Prepopulate updateFields
//     } catch (error) {
//       console.error("Error fetching flight data:", error);
//       alert("Error fetching flight data. Please check the Flight ID.");
//     }
//   };

//   // Update flight data
//   const handleUpdateFlight = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:9000/api/flights/update/${flightIdToUpdate}`,
//         updateFields
//       );
//       console.log("Flight updated successfully:", response.data);
//       alert("Flight updated successfully!");
//       setFlightData(null); // Reset the form
//       setFlightIdToUpdate(""); // Clear Flight ID
//     } catch (error) {
//       console.error("Error updating flight:", error);
//       alert("Error updating flight. Please try again.");
//     }
//   };

//   // Handle field changes
//   const handleFieldChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateFields((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDeleteFlight = async (flightId) => {
//     try {
//       await axios.delete(
//         `http://localhost:8080/api/flights/delete/${flightId}`
//       );
//       console.log("Flight deleted successfully");
//     } catch (error) {
//       console.error("Error deleting flight:", error);
//       throw error;
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Manage Flights
//       </Typography>
//       <AppBar position="static">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//         >
//           <Tab label="Add Flight" />
//           <Tab label="Get Flight" />
//           <Tab label="Update Flight" />
//           <Tab label="Delete Flight" />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         <Grid container spacing={2}>
//           {[
//             {
//               label: "Company ID",
//               name: "companyId",
//               placeholder: "Enter Company ID",
//             },
//             {
//               label: "Flight ID",
//               name: "flightNo",
//               placeholder: "Enter Flight Number",
//             },
//             {
//               label: "Origin",
//               name: "origin",
//               placeholder: "Enter Origin City",
//             },
//             {
//               label: "Destination",
//               name: "destination",
//               placeholder: "Enter Destination City",
//             },
//             // { label: 'Total Seats', name: 'totalSeats', type: 'number', placeholder: 'Enter Total Seats' },
//             // { label: 'Available Seats', name: 'availableSeats', type: 'number', placeholder: 'Enter Available Seats' },
//             {
//               label: "Rows (seating layout)",
//               name: "rows",
//               type: "number",
//               placeholder: "Enter Number of Rows",
//             },
//             {
//               label: "Columns (seating layout)",
//               name: "columns",
//               type: "number",
//               placeholder: "Enter Number of Columns",
//             },
//             {
//               label: "Seat Types",
//               name: "seatTypes",
//               placeholder: "Enter Seat Types (e.g., Economy, Business)",
//             },
//             {
//               label: "Fare",
//               name: "fare",
//               type: "number",
//               placeholder: "Enter Fare Amount",
//             },
//             {
//               label: "Baggage Info",
//               name: "baggageInfo",
//               placeholder: "Enter Baggage Information",
//             },
//             {
//               label: "Booking ID",
//               name: "bookingId",
//               placeholder: "Enter Booking ID",
//             },
//             {
//               label: "Dates (comma-separated)",
//               name: "dates",
//               placeholder: "Enter Dates (e.g., 2023-12-01,2023-12-02)",
//             },
//             {
//               label: "Timings (JSON format)",
//               name: "timings",
//               placeholder:
//                 "Enter Timings as JSON (e.g., Monday: 10:00 AM, Wednesday: 2:00 PM)",
//             },
//             // { label: 'Seats (JSON format)', name: 'seats', placeholder: 'Enter Seats as JSON (e.g., {"A1": true, "A2": false})' },
//           ].map((field, index) => (
//             <Grid item xs={12} sm={6} key={index}>
//               <TextField
//                 fullWidth
//                 label={field.label}
//                 name={field.name}
//                 type={field.type || "text"}
//                 placeholder={field.placeholder}
//                 value={flightData[field.name] || ""}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddFlight}
//             >
//               Add Flight
//             </Button>
//           </Grid>
//         </Grid>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <Grid2 container spacing={2}>
//           <Typography variant="h6">Get Flights</Typography>
//           <TextField
//             fullWidth
//             label="Company Id"
//             name="flightId"
//             type="text"
//             placeholder="Enter Company ID"
//             value={flightId}
//             onChange={(e) => setFlightId(e.target.value)}
//             variant="outlined"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleGetFlight(flightId)} // Use flightId directly from state
//           >
//             Fetch Flights
//           </Button>
//           {error && (
//             <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
//               {error}
//             </Typography>
//           )}

//           <Grid container spacing={2}>
//             {flights.length > 0
//               ? flights.map((flight) => (
//                   <Grid item xs={12} sm={6} md={4} key={flight.flightId}>
//                     <Card>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           Flight No: {flight.flightNo}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Origin:</strong> {flight.origin}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Destination:</strong> {flight.destination}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Available Seats:</strong>{" "}
//                           {flight.availableSeats}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Fare:</strong> ${flight.fare}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Baggage Info:</strong> {flight.baggageInfo}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))
//               : !error && (
//                   <Typography variant="body1" sx={{ marginTop: 2 }}>
//                     No flights found. Enter a valid Company ID.
//                   </Typography>
//                 )}
//           </Grid>
//         </Grid2>
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//       <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
//         <Typography variant="h6">Update Flight</Typography>
//         {!flightData ? (
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Flight ID"
//                 value={flightIdToUpdate}
//                 onChange={(e) => setFlightIdToUpdate(e.target.value)}
//                 placeholder="Enter Flight ID to update"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleFetchFlightData(flightIdToUpdate)}
//               >
//                 Fetch Flight
//               </Button>
//             </Grid>
//           </Grid>
//         ) : (
//           <Grid container spacing={2}>
//             {[
//             {
//               label: "Company ID",
//               name: "companyId",
//               placeholder: "Enter Company ID",
//             },
//             {
//               label: "Flight ID",
//               name: "flightNo",
//               placeholder: "Enter Flight Number",
//             },
//             {
//               label: "Origin",
//               name: "origin",
//               placeholder: "Enter Origin City",
//             },
//             {
//               label: "Destination",
//               name: "destination",
//               placeholder: "Enter Destination City",
//             },
//             // { label: 'Total Seats', name: 'totalSeats', type: 'number', placeholder: 'Enter Total Seats' },
//             // { label: 'Available Seats', name: 'availableSeats', type: 'number', placeholder: 'Enter Available Seats' },
//             {
//               label: "Rows (seating layout)",
//               name: "rows",
//               type: "number",
//               placeholder: "Enter Number of Rows",
//             },
//             {
//               label: "Columns (seating layout)",
//               name: "columns",
//               type: "number",
//               placeholder: "Enter Number of Columns",
//             },
//             {
//               label: "Seat Types",
//               name: "seatTypes",
//               placeholder: "Enter Seat Types (e.g., Economy, Business)",
//             },
//             {
//               label: "Fare",
//               name: "fare",
//               type: "number",
//               placeholder: "Enter Fare Amount",
//             },
//             {
//               label: "Baggage Info",
//               name: "baggageInfo",
//               placeholder: "Enter Baggage Information",
//             },
//             {
//               label: "Booking ID",
//               name: "bookingId",
//               placeholder: "Enter Booking ID",
//             },
//             {
//               label: "Dates (comma-separated)",
//               name: "dates",
//               placeholder: "Enter Dates (e.g., 2023-12-01,2023-12-02)",
//             },
//             {
//               label: "Timings (JSON format)",
//               name: "timings",
//               placeholder:
//                 "Enter Timings as JSON (e.g., Monday: 10:00 AM, Wednesday: 2:00 PM)",
//             },
//             // { label: 'Seats (JSON format)', name: 'seats', placeholder: 'Enter Seats as JSON (e.g., {"A1": true, "A2": false})' },
//           ].map((field, index) => (
//             <Grid item xs={12} sm={6} key={index}>
//               <TextField
//                 fullWidth
//                 label={field.label}
//                 name={field.name}
//                 type={field.type || "text"}
//                 placeholder={field.placeholder}
//                 value={flightData[field.name] || ""}
//                 onChange={handleInputChange}
//                 variant="outlined"
//               />
//             </Grid>
//           ))}
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleUpdateFlight}
//               >
//                 Update Flight
//               </Button>
//             </Grid>
//           </Grid>
//         )}
//       </Paper>
//     </TabPanel>
//       <TabPanel value={value} index={3}>
//         <Typography variant="h6">Delete Flight</Typography>
//         <Grid2 container spacing={2}>
//           <Grid2 item xs={12}>
//             <TextField fullWidth label="Flight ID" />
//           </Grid2>
//           <Grid2 item xs={12}>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleDeleteFlight}
//             >
//               Delete Flight
//             </Button>
//           </Grid2>
//         </Grid2>
//       </TabPanel>
//     </Paper>
//   );
// }
