import React, { useState } from "react";
import { Box, Grid2, Typography, Button } from "@mui/material";

const SeatMap = () => {
  const rows = 10; // Number of rows
  const columns = 6; // Number of columns per row

  // State to track selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selected,setSelected] = useState(false)

  // Helper function to generate seat IDs
  const getSeatId = (row, col) => {
    const colLetter = String.fromCharCode(65 + col);
    return `${row+1}-${colLetter}`;
  }

  // Handle seat selection
  const handleSeatClick = (row, col) => {
    const seatId = getSeatId(row, col);

    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seatId)
          ? prevSelectedSeats.filter((id) => id !== seatId) // Deselect if already selected
          : [...prevSelectedSeats, seatId] // Select seat
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Seat Map
      </Typography>

      {/* Top Exit */}
      <Grid2 container justifyContent="center" spacing={1} alignItems="center">
        <Grid2>
          <Typography color="error" variant="caption">
            EXIT
          </Typography>
        </Grid2>
      </Grid2>

      {/* Seats */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {[...Array(rows)].map((_, rowIndex) => (
          <Grid2 container justifyContent="center" key={rowIndex} spacing={1}>
            {[...Array(columns)].map((_, colIndex) => {
              const seatId = getSeatId(rowIndex, colIndex);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <Grid2 key={colIndex}>
                  <Button
                    variant="contained"
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                    sx={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: isSelected ? "#4caf50" : "#f5f5f5",
                      color: isSelected ? "#fff" : "#000",
                    }}
                  >
                    {rowIndex + 1}
                    {String.fromCharCode(65 + colIndex)}
                  </Button>
                </Grid2>
              );
            })}
          </Grid2>
        ))}
      </Box>

      {/* Bottom Exit */}
      <Grid2
        container
        justifyContent="center"
        spacing={1}
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid2>
          <Typography color="error" variant="caption">
            EXIT
          </Typography>
        </Grid2>
      </Grid2>

      {/* Selected Seats */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">Selected Seats:</Typography>
        {selectedSeats.length > 0 ? (
          <Typography variant="body2">{selectedSeats.join(", ")}</Typography>
        ) : (
          <Typography variant="body2">No seats selected</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SeatMap;

// import React, { useState } from 'react'

// const SeatMap = () => {
//     const initialSeats = [
//         { seatId: "1A", type: "window", status: "available", price: 150 },
//         { seatId: "1B", type: "aisle", status: "booked", price: 130 },
//         { seatId: "1C", type: "middle", status: "available", price: 100 },
//         { seatId: "2A", type: "window", status: "available", price: 150 },
//         { seatId: "2B", type: "aisle", status: "locked", price: 130 },
//         { seatId: "2C", type: "middle", status: "available", price: 100 },
//     ];

//     const [seats, setSeats] = useState(initialSeats);
//     const [selectedSeat, setSelectedSeat] = useState(null);

//     const handleSeatClick = (seatId) => {
//         const updatedSeats = seats.map((seat) => {
//             if (seat.seatId === seatId && seat.status === "available") {
//                 return { ...seat, status: "selected" };
//             } else if (seat.status === "selected") {
//                 return { ...seat, status: "available" };
//             }
//             return seat;
//         });
//         setSeats(updatedSeats);
//         setSelectedSeat(seatId);
//     };

//     const confirmBooking = () => {
//         if (!selectedSeat) return alert("No seat selected!");
//         const updatedSeats = seats.map((seat) => {
//             if (seat.seatId === selectedSeat) {
//                 return { ...seat, status: "booked" };
//             }
//             return seat;
//         });
//         setSeats(updatedSeats);
//         setSelectedSeat(null);
//         alert("Seat booked successfully!");
//     };

//     return (
//         <div>
//             <h1>Seat Selection</h1>
//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(3, 100px)",
//                     gap: "10px",
//                     justifyContent: "center",
//                     margin: "20px 0",
//                 }}
//             >
//                 {seats.map((seat) => (
//                     <button
//                         key={seat.seatId}
//                         onClick={() => handleSeatClick(seat.seatId)}
//                         style={{
//                             padding: "20px",
//                             border: "1px solid #ccc",
//                             backgroundColor:
//                                 seat.status === "booked"
//                                     ? "red"
//                                     : seat.status === "locked"
//                                         ? "gray"
//                                         : seat.status === "selected"
//                                             ? "yellow"
//                                             : "green",
//                             color: "white",
//                             cursor: seat.status === "available" ? "pointer" : "not-allowed",
//                         }}
//                         disabled={seat.status !== "available" && seat.status !== "selected"}
//                     >
//                         {seat.seatId}
//                     </button>
//                 ))}
//             </div>
//             <div>
//                 {selectedSeat ? (
//                     <>
//                         <p>Selected Seat: {selectedSeat}</p>
//                         <button onClick={confirmBooking}>Confirm Booking</button>
//                     </>
//                 ) : (
//                     <p>Please select a seat.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default SeatMap