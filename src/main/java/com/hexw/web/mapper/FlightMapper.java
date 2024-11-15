package com.hexw.web.mapper;

import com.hexw.web.models.Flight;
import com.hexw.web.dto.FlightDTO;

import java.util.List;
import java.util.stream.Collectors;

public class FlightMapper {

    // Method to map a Flight to a FlightDTO (for response or data transfer)
    public static FlightDTO toFlightDTO(Flight flight) {
        FlightDTO flightDTO = new FlightDTO();
        flightDTO.setFlightId(flight.getFlightId());
        flightDTO.setCompanyId(flight.getCompanyId());
        flightDTO.setFlightNo(flight.getFlightNo());
        flightDTO.setOrigin(flight.getOrigin());
        flightDTO.setDestination(flight.getDestination());
        flightDTO.setTotalSeats(flight.getTotalSeats());
        flightDTO.setAvailableSeats(flight.getAvailableSeats());
        flightDTO.setFare(flight.getFare());
        flightDTO.setBaggageInfo(flight.getBaggageInfo());
        flightDTO.setBookingId(flight.getBookingId());
        flightDTO.setDates(flight.getDates());
        flightDTO.setTimings(flight.getTimings());
        flightDTO.setSeatTypes(flight.getSeatTypes());
        flightDTO.setSeats(flight.getSeats());
        
        return flightDTO;
    }

    // Method to map a list of Flight objects to a list of FlightDTO objects
    public static List<FlightDTO> toFlightDTOList(List<Flight> flights) {
        return flights.stream()
                      .map(FlightMapper::toFlightDTO)
                      .collect(Collectors.toList());
    }

    // Method to map a FlightDTO to a Flight entity (for saving data)
    public static Flight toFlightEntity(FlightDTO flightDTO) {
        Flight flight = new Flight();
        flight.setFlightId(flightDTO.getFlightId());
        flight.setCompanyId(flightDTO.getCompanyId());
        flight.setFlightNo(flightDTO.getFlightNo());
        flight.setOrigin(flightDTO.getOrigin());
        flight.setDestination(flightDTO.getDestination());
        flight.setTotalSeats(flightDTO.getTotalSeats());
        flight.setAvailableSeats(flightDTO.getAvailableSeats());
        flight.setFare(flightDTO.getFare());
        flight.setBaggageInfo(flightDTO.getBaggageInfo());
        flight.setBookingId(flightDTO.getBookingId());
        flight.setDates(flightDTO.getDates());
        flight.setTimings(flightDTO.getTimings());
        flight.setSeatTypes(flightDTO.getSeatTypes());
        flight.setSeats(flightDTO.getSeats());
        
        return flight;
    }
}
