package com.hexw.web.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexw.web.dao.BookingRepo;
import com.hexw.web.dao.FlightRepo;
import com.hexw.web.dao.PassengerRepo;
import com.hexw.web.mapper.FlightMapper;
import com.hexw.web.models.Booking;
import com.hexw.web.models.Flight;
import com.hexw.web.models.Passengers;

import jakarta.transaction.Transactional;

import com.hexw.web.dto.FlightDTO;
import com.hexw.web.dto.PassengerDTO;

@Service
public class FlightServices {

    @Autowired
    private FlightRepo flightRepository;
    
    @Autowired
    private PassengerRepo passengerRepository;
    
    @Autowired
    private BookingRepo bookingRepository;

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public Optional<FlightDTO> getFlightById(Long flightId) {
        Optional<Flight> flight = flightRepository.findById(flightId);
        return flight.map(FlightMapper::toFlightDTO); // Use FlightMapper to convert Flight to FlightDTO
    }
    
    public Optional<List<FlightDTO>> getFlightsByCompanyId(Long companyId) {
        List<Flight> flights = flightRepository.findByCompanyId(companyId);
        return flights.isEmpty() 
               ? Optional.empty() 
               : Optional.of(flights.stream()
                   .map(FlightMapper::toFlightDTO) // Use the mapper for conversion
                   .collect(Collectors.toList()));
    }

    public List<FlightDTO> searchFlights(String tripType, String origin, String destination, List<String> dates,
                                         int numOfTravellers) {

        if (origin == null || destination == null || dates == null || dates.isEmpty() || numOfTravellers <= 0) {
            throw new IllegalArgumentException("Invalid input parameters");
        }

        String departureDate;
        String returnDate = null;

        try {
            departureDate = dates.get(0); 
            if ("round-trip".equalsIgnoreCase(tripType) && dates.size() > 1) {
                returnDate = dates.get(1);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid date format", e);
        }

        List<Flight> matchingFlights = new ArrayList<>();

        if ("one-way".equalsIgnoreCase(tripType)) {
            matchingFlights = handleOneWayTrip(origin, destination, departureDate, numOfTravellers);
        } else if ("round-trip".equalsIgnoreCase(tripType)) {
            if (returnDate == null) {
                throw new IllegalArgumentException("Return date is required for round-trip flights");
            }
            matchingFlights = handleRoundTrip(origin, destination, departureDate, returnDate, numOfTravellers);
        } else {
            throw new IllegalArgumentException("Invalid trip type. Choose 'one-way' or 'round-trip'");
        }

        return FlightMapper.toFlightDTOList(matchingFlights); // Return list of FlightDTOs
    }

    private List<Flight> handleOneWayTrip(String origin, String destination, String departureDate, int numOfTravellers) {
        List<Flight> availableFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(origin, destination,
                departureDate);

        return filterFlightsBySeats(availableFlights, numOfTravellers);
    }

    private List<Flight> handleRoundTrip(String origin, String destination, String departureDate, String returnDate,
                                         int numOfTravellers) {
        List<Flight> outboundFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(origin, destination,
                departureDate);

        List<Flight> returnFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(destination, origin,
                returnDate);

        List<Flight> matchingOutboundFlights = filterFlightsBySeats(outboundFlights, numOfTravellers);
        List<Flight> matchingReturnFlights = filterFlightsBySeats(returnFlights, numOfTravellers);

        List<Flight> matchingFlights = new ArrayList<>();
        matchingFlights.addAll(matchingOutboundFlights);
        matchingFlights.addAll(matchingReturnFlights);

        return matchingFlights;
    }

    private List<Flight> filterFlightsBySeats(List<Flight> flights, int numOfTravellers) {
        List<Flight> filteredFlights = new ArrayList<>();
        for (Flight flight : flights) {
            if (flight.getAvailableSeats() >= numOfTravellers) {
                filteredFlights.add(flight);
            }
        }
        return filteredFlights;
    }

    public Flight updateFlight(Long flightId, Flight flightDetails) {
        Flight flight = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("Flight not found"));

        flight.setCompanyId(flightDetails.getCompanyId());
        flight.setFlightNo(flightDetails.getFlightNo());
        flight.setOrigin(flightDetails.getOrigin());
        flight.setDestination(flightDetails.getDestination());
        flight.setTotalSeats(flightDetails.getTotalSeats());
        flight.setAvailableSeats(flightDetails.getAvailableSeats());
        flight.setSeatTypes(flightDetails.getSeatTypes());
        flight.setFare(flightDetails.getFare());
        flight.setBaggageInfo(flightDetails.getBaggageInfo());
        flight.setBookingId(flightDetails.getBookingId());
        flight.setDates(flightDetails.getDates());
        flight.setTimings(flightDetails.getTimings());

        return flightRepository.save(flight);
    }

    public void deleteFlight(Long flightId) {
        flightRepository.deleteById(flightId);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

//    public String bookSeats(Long flightId, List<String> seatNumbers) {
//        Optional<Flight> flightOptional = flightRepository.findById(flightId);
//
//        if (flightOptional.isPresent()) {
//            Flight flight = flightOptional.get();
//
//            Map<String, Boolean> seatData = flight.getSeats();
//
//            for (String seatNumber : seatNumbers) {
//                seatData.put(seatNumber, false);
//                flight.setAvailableSeats(flight.getAvailableSeats() - 1);
//            }
//
//            flight.setSeats(seatData);
//            flightRepository.save(flight);
//
//            return "Seats " + seatNumbers + " have been successfully booked.";
//        }
//        return null;
//    }
    
    
    

}
