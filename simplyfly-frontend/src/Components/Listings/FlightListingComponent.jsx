import React, { useState } from "react";
import { Container } from "@mui/material";
import FlightList from "./FlightList";
import FlightFilter from "./FlightFilter";
import Navbar from "../Homepage/Navbar";
import Footer from "../../Footer";
import axios from "axios";
import moment from "moment";
import FlightSearch from "../Homepage/FlightSearch";

const FlightListingPage = () => {
  const [flights, setFlights] = useState({});
  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = async (filters) => {
    console.log(filters);
    const origin = filters.origin;
    const destination = filters.destination;
    const tripType = filters.tripType; // Example: "one-way" or "round-trip"
    const departureDate = filters.departureDate;
    const returnDate = filters.returnDate;
    console.log("harshit");
    const numOfTravellers =
      filters.passengers.adults +
      filters.passengers.children +
      filters.passengers.infants;
    console.log("harshit1");
    try {
      // Make sure you're accessing `.city` if `origin` and `destination` are objects
      const response = await axios.get(
        "http://localhost:9000/api/flights/search",
        {
          params: {
            tripType: tripType,
            origin: origin.city, // Access city property if origin is an object
            destination: destination.city, // Access city property if destination is an object
            dates: `${departureDate},${returnDate}`, // List of dates as a comma-separated string
            numOfTravellers: numOfTravellers,
          },
        }
      );

      console.log("Filtered flights:", response.data);
      setFilteredFlights(response.data); // Update the filtered flights state
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("Failed to search for flights. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <FlightFilter onSearch={handleSearch} />
        <FlightList flights={filteredFlights} />
      </Container>
      <Footer />
    </>
  );
};

export default FlightListingPage;
