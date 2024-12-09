// import React from "react";
// import { Card, CardContent, Typography, Button, Box, CardActionArea } from "@mui/material";
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import FlightLandIcon from '@mui/icons-material/FlightLand';
// import {Link, useLocation} from "react-router-dom"

// const FlightList = ({ flights }) => {
//   const location=useLocation();
//   const filteredFlights=location.state;
//   console.log(filteredFlights);
  
//   return (
//     <Box display="flex" flexDirection="column" gap={3} width="100%" padding={2}>
//       {flights.map((flight, index) => (
//         <Card
//           key={index}
//           sx={{
//             boxShadow: 3,
//             borderRadius: 2,
//             padding: 2,
//             '&:hover': {
//               boxShadow: 6,
//               transform: 'scale(1.02)',
//               transition: 'all 0.3s ease',
//             },
//           }}
//         >
//           <CardActionArea>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 {flight.name}
//               </Typography>
//               <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
//                 <FlightTakeoffIcon fontSize="small" />
//                 <Typography variant="body2" fontWeight="medium">
//                   {flight.origin}
//                 </Typography>
//                 <Typography variant="body2" fontWeight="medium">
//                   → {flight.destination}
//                 </Typography>
//                 <FlightLandIcon fontSize="small" />
//               </Box>

//               <Typography variant="body2" color="textSecondary">
//                 Flight No: <strong>{flight.flightNo}</strong>
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Seats: <strong>{flight.availableSeats}</strong>
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Duration: <strong>{flight.duration}</strong>
//               </Typography>
//               <Typography variant="h6" color="secondary" marginTop={2}>
//                 Fare: <strong>₹{flight.fare}</strong>
//               </Typography>

//               <Link to="/review">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{
//                   marginTop: 2,
//                   padding: "10px",
//                   '&:hover': {
//                     backgroundColor: '#1976d2',
//                     transform: 'scale(1.05)',
//                   },
//                 }}
//               >
//                 Book Now
//               </Button></Link>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default FlightList;


import React from "react";
import { Card, CardContent, Typography, Button, Box, CardActionArea } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Link } from "react-router-dom";

const FlightList = ({ flights }) => {

  // const handleClick=(flight)=>{
  //   console.log(flight);
  // }
  return (
    <Box display="flex" flexDirection="column" gap={3} width="100%" padding={2}>
      {flights.map((flight, index) => (
        <Card
          key={index}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            '&:hover': {
              boxShadow: 6,
              transform: 'scale(1.02)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {flight.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
                <FlightTakeoffIcon fontSize="small" />
                <Typography variant="body2" fontWeight="medium">
                  {flight.origin}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  → {flight.destination}
                </Typography>
                <FlightLandIcon fontSize="small" />
              </Box>

              <Typography variant="body2" color="textSecondary">
                Flight No: <strong>{flight.flightNo}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Seats: <strong>{flight.availableSeats}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Duration: <strong>{flight.duration}</strong>
              </Typography>
              <Typography variant="h6" color="secondary" marginTop={2}>
                Fare: <strong>₹{flight.fare}</strong>
              </Typography>

              <Link to="/review" state={{ selectedFlight: flight }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: "10px",
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default FlightList;
