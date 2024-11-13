package com.hexw.web.Services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexw.web.Dao.FlightRepo;
import com.hexw.web.Models.Flight;

@Service
public class FlightServices {

    @Autowired
    private FlightRepo flightRepository;
    
    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public Optional<Flight> getFlightById(Long flightId) {
        return flightRepository.findById(flightId);
    }
    
    public List<Flight> searchFlights(String tripType, String origin, String destination, List<String> dates,
			int numOfTravellers) {

		if (origin == null || destination == null || dates == null || dates.isEmpty() || numOfTravellers <= 0) {
			throw new IllegalArgumentException("Invalid input parameters");
		}

		LocalDate departureDate;
		LocalDate returnDate = null;

		try {
			departureDate = LocalDate.parse(dates.get(0));
			if ("round-trip".equalsIgnoreCase(tripType) && dates.size() > 1) {
				returnDate = LocalDate.parse(dates.get(1));
			}
		} catch (Exception e) {
			throw new IllegalArgumentException("Invalid date format", e);
		}

		// Fetch flights based on trip type
		List<Flight> availableFlights = new ArrayList<>();
		if ("one-way".equalsIgnoreCase(tripType)) {
			availableFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(origin, destination, departureDate);
		} else if ("round-trip".equalsIgnoreCase(tripType)) {
			if (returnDate == null) {
				throw new IllegalArgumentException("Return date is required for round-trip flights");
			}
			availableFlights = flightRepository.findByOriginAndDestinationAndDepartureDateAndReturnDate(origin, destination, departureDate, returnDate);
		} else {
			throw new IllegalArgumentException("Invalid trip type. Choose 'one-way' or 'round-trip'");
		}

		// Filter flights based on available seats
		List<Flight> matchingFlights = new ArrayList<>();
		for (Flight flight : availableFlights) {
			if (flight.getAvailableSeats() >= numOfTravellers) {
				matchingFlights.add(flight);
			}
		}

		return matchingFlights;
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
        flight.setDate(flightDetails.getDate());
        flight.setTimings(flightDetails.getTimings());
        flight.setDepartureDate(flightDetails.getDepartureDate());
        flight.setReturnDate(flightDetails.getReturnDate());

        return flightRepository.save(flight);
    }
    
    public void deleteFlight(Long flightId) {
        flightRepository.deleteById(flightId);
    }
    
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
}
