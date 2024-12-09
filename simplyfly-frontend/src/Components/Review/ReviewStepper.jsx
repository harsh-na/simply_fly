// import React, { useState } from "react";
// import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem, Card, Grid2 } from "@mui/material";
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { styled } from '@mui/system';
// import SeatMap from "./SeatMap";

// const steps = ["Review your itinerary", "Choose add-ons", "Add Contact details", "Add traveller details", "Review details"];

// const ReviewStepper = () => {
//     const [activeStep, setActiveStep] = useState(0);
//     const [formValues, setFormValues] = useState({
//         fname: "",
//         lname: "",
//         age: "",
//         email: "",
//         phone: "",
//         gender: "",
//     });

//     const handleNext = () => {
//         setActiveStep((prevStep) => prevStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevStep) => prevStep - 1);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };

//     const handleSubmit = () => {
//         console.log("Form submitted:", formValues);
//         setActiveStep((prevStep) => prevStep + 1);
//     };

//     const renderStepContent = (step) => {
//         switch (step) {
//             case 0:
//                 return (
//                     <Grid2 container justifyContent="space-between" alignItems="center" spacing={2}>
//                         <Grid2 size={{ md: 12 }}>
//                             <Typography variant="h6" textAlign="center" fontWeight="700">Flight Details</Typography>
//                         </Grid2>

//                         <Grid2 size={{ md: 12 }}>
//                             <Typography variant="body1" textAlign="center" fontWeight="500">05-12-2024</Typography>
//                         </Grid2>

//                         {/* To FLight details */}
//                         <Grid2 size={{ md: 12 }}>
//                             <Grid2 container size={{ md: 8.5 }} justifyContent="space-between" textAlign="center">
//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Flight</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">3345</Typography>
//                                 </Grid2>

//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Origin</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">MAA</Typography>
//                                 </Grid2>

//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Destination</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">HYD</Typography>
//                                 </Grid2>

//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Departure Time</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">19:30</Typography>
//                                 </Grid2>
//                             </Grid2>
//                         </Grid2>

//                         <Grid2 size={{ md: 12 }}>
//                             <Typography variant="body1" textAlign="center" fontWeight="500">08-12-2024</Typography>
//                         </Grid2>

//                         {/* Fro FLight details */}
//                         <Grid2 size={{ md: 12 }}>
//                             <Grid2 container size={{ md: 8.5 }} justifyContent="space-between">
//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Flight</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">3360</Typography>
//                                 </Grid2>

//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Origin</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">HYD</Typography>
//                                 </Grid2>

//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Destination</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">MAA</Typography>
//                                 </Grid2>

//                                 <Grid2 size={{ md: 6 }}>
//                                     <Typography textAlign="right" fontWeight="900">Departure Time</Typography>
//                                 </Grid2>
//                                 <Grid2 size={{ md: 1 }}>
//                                     <Typography textAlign="left">15:30</Typography>
//                                 </Grid2>
//                             </Grid2>
//                         </Grid2>
//                     </Grid2>
//                 )

//             case 1:
//                 return (
//                     // <Box>
//                     //     <Typography>Seat map for the selected flight(s) would be shown here</Typography>
                        
//                     // </Box>
//                     <SeatMap />
//                 );
//             case 2:
//                 return (
//                     <Box>
//                         <TextField
//                             label="Email" name="email" value={formValues.email}
//                             onChange={handleChange} type="email"
//                             fullWidth margin="normal"
//                         />
//                         <TextField
//                             label="Phone" name="phone" value={formValues.phone}
//                             onChange={handleChange} type="tel"
//                             fullWidth margin="normal"
//                         />
//                     </Box>
//                 );
//             case 3:
//                 return (
//                     <Grid2 container spacing={2}>
//                         <Grid2 size={{ md: 12 }}>
//                             <Typography variant="h6">Traveller 1</Typography>
//                         </Grid2>

//                         <Grid2 size={{ md: 4 }}>
//                             <TextField
//                                 label="First name" name="fname" value={formValues.fname}
//                                 onChange={handleChange} type="text"
//                                 fullWidth
//                             />
//                         </Grid2>

//                         <Grid2 size={{ md: 4 }}>
//                             <TextField
//                                 label="Last name" name="lname" value={formValues.lname}
//                                 onChange={handleChange} type="text"
//                                 fullWidth
//                             />
//                         </Grid2>

//                         {/* <Grid2 size={{ md: 4 }}>
//                             <TextField
//                                 label="Age" name="age" value={formValues.age}
//                                 onChange={handleChange} type="number"
//                                 fullWidth
//                             />
//                         </Grid2> */}

//                         <Grid2>
//                             <Box sx={{ minWidth: 120 }}>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="gender-select-label">Gender</InputLabel>
//                                     <Select
//                                         labelId="gender-select-label"
//                                         id="gender-select"
//                                         name="gender"
//                                         value={formValues.gender}
//                                         label="Gender"
//                                         onChange={handleChange}
//                                         sx={{ minWidth: 120 }}
//                                     >
//                                         <MenuItem value="Male">Male</MenuItem>
//                                         <MenuItem value="Female">Female</MenuItem>
//                                         <MenuItem value="Others">Others</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                         </Grid2>
//                     </Grid2>
//                 );

//             case 4:
//                 return (
//                     <Box>
//                         <Typography variant="h6">Review Your Details</Typography>
//                         <Typography>Name: {formValues.fname + " " + formValues.lname}</Typography>
//                         {/* <Typography>Age: {formValues.age}</Typography> */}
//                         <Typography>Email: {formValues.email}</Typography>
//                         <Typography>Phone: {formValues.phone}</Typography>
//                         <Typography>Gender: {formValues.gender}</Typography>
//                     </Box>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Grid2 container alignItems="center" justifyContent="center" height="100dvh">
//             <Box sx={{ width: "50%", mx: "auto" }}>
//                 <Card elevation={24} sx={{ p: 4 }}>
//                     {/* <CustomCard sx={{ p: 4 }}> */}
//                     <Stepper activeStep={activeStep} alternativeLabel>
//                         {steps.map((label) => (
//                             <Step key={label}>
//                                 <StepLabel>{label}</StepLabel>
//                             </Step>
//                         ))}
//                     </Stepper>

//                     <Box sx={{ mt: 4 }}>
//                         {activeStep === steps.length ? (
//                             <Box>
//                                 <Typography variant="h5" align="center">
//                                     Thank you! Your form has been submitted.
//                                 </Typography>
//                                 <Button onClick={() => setActiveStep(0)} sx={{ mt: 2 }}>
//                                     Reset
//                                 </Button>
//                             </Box>
//                         ) : (
//                             <Box>
//                                 {renderStepContent(activeStep)}
//                                 <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//                                     <Button
//                                         disabled={activeStep === 0}
//                                         onClick={handleBack}
//                                     >
//                                         Back
//                                     </Button>
//                                     {activeStep === steps.length - 1 ? (
//                                         <Button variant="contained" onClick={handleSubmit}>
//                                             Submit
//                                         </Button>
//                                     ) : (
//                                         <Button variant="contained" onClick={handleNext}>
//                                             Next
//                                         </Button>
//                                     )}
//                                 </Box>
//                             </Box>
//                         )}
//                     </Box>
//                     {/* </CustomCard> */}
//                 </Card>
//             </Box>
//         </Grid2>
//     );
// };

// export default ReviewStepper;

import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem, Card, Grid2 } from "@mui/material";
import { useLocation } from "react-router-dom";
import SeatMap from "./SeatMap";

const steps = ["Review your itinerary", "Choose add-ons", "Add Contact details", "Add traveller details", "Review details"];

const ReviewStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        fname: "",
        lname: "",
        age: "",
        email: "",
        phone: "",
        gender: "",
    });
  
    const location = useLocation();
    const selectedFlight = location.state?.selectedFlight;

    console.log(location.state)

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formValues);
        setActiveStep((prevStep) => prevStep + 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h6" fontWeight="700">Flight Details</Typography>
                        <Typography variant="body1">{selectedFlight?.name}</Typography>
                        <Typography variant="body1">{selectedFlight?.origin} → {selectedFlight?.destination}</Typography>
                        <Typography variant="body1">Flight No: {selectedFlight?.flightNo}</Typography>
                        <Typography variant="body1">Seats: {selectedFlight?.availableSeats}</Typography>
                        <Typography variant="body1">Duration: {selectedFlight?.duration}</Typography>
                        <Typography variant="h6" color="secondary" marginTop={2}>
                            Fare: ₹{selectedFlight?.fare}
                        </Typography>
                    </Box>
                );
            case 1:
                return <SeatMap />;
            case 2:
                return (
                    <Box>
                        <TextField
                            label="Email" name="email" value={formValues.email}
                            onChange={handleChange} type="email"
                            fullWidth margin="normal"
                        />
                        <TextField
                            label="Phone" name="phone" value={formValues.phone}
                            onChange={handleChange} type="tel"
                            fullWidth margin="normal"
                        />
                    </Box>
                );
            case 3:
                return (
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ md: 12 }}>
                            <Typography variant="h6">Traveller 1</Typography>
                        </Grid2>

                        <Grid2 size={{ md: 4 }}>
                            <TextField
                                label="First name" name="fname" value={formValues.fname}
                                onChange={handleChange} type="text"
                                fullWidth
                            />
                        </Grid2>

                        <Grid2 size={{ md: 4 }}>
                            <TextField
                                label="Last name" name="lname" value={formValues.lname}
                                onChange={handleChange} type="text"
                                fullWidth
                            />
                        </Grid2>

                        <Grid2>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-select-label"
                                        id="gender-select"
                                        name="gender"
                                        value={formValues.gender}
                                        label="Gender"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid2>
                    </Grid2>
                );
            case 4:
                return (
                    <Box>
                        <Typography variant="h6">Review Your Details</Typography>
                        <Typography>Name: {formValues.fname + " " + formValues.lname}</Typography>
                        <Typography>Email: {formValues.email}</Typography>
                        <Typography>Phone: {formValues.phone}</Typography>
                        <Typography>Gender: {formValues.gender}</Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Grid2 container alignItems="center" justifyContent="center" height="100dvh">
            <Box sx={{ width: "50%", mx: "auto" }}>
                <Card elevation={24} sx={{ p: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box sx={{ mt: 4 }}>
                        {activeStep === steps.length ? (
                            <Box>
                                <Typography variant="h5" align="center">
                                    Thank you! Your form has been submitted.
                                </Typography>
                                <Button onClick={() => setActiveStep(0)} sx={{ mt: 2 }}>
                                    Reset
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                {renderStepContent(activeStep)}
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    {activeStep === steps.length - 1 ? (
                                        <Button variant="contained" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button variant="contained" onClick={handleNext}>
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Card>
            </Box>
        </Grid2>
    );
};

export default ReviewStepper;
