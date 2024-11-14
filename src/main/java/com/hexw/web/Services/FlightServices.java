package com.hexw.web.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

// Initialize departure and return dates
		String departureDate;
		String returnDate = null;

		try {
			departureDate = dates.get(0); // First date is always the departure date
			if ("round-trip".equalsIgnoreCase(tripType) && dates.size() > 1) {
				returnDate = dates.get(1); // Second date is the return date, if available
			}
		} catch (Exception e) {
			throw new IllegalArgumentException("Invalid date format", e);
		}

// List to store matching flights
		List<Flight> matchingFlights = new ArrayList<>();

		if ("one-way".equalsIgnoreCase(tripType)) {
// Handle one-way trip
			matchingFlights = handleOneWayTrip(origin, destination, departureDate, numOfTravellers);

		} else if ("round-trip".equalsIgnoreCase(tripType)) {
// Handle round-trip
			if (returnDate == null) {
				throw new IllegalArgumentException("Return date is required for round-trip flights");
			}
			matchingFlights = handleRoundTrip(origin, destination, departureDate, returnDate, numOfTravellers);

		} else {
			throw new IllegalArgumentException("Invalid trip type. Choose 'one-way' or 'round-trip'");
		}

		return matchingFlights;
	}

//Helper method to handle one-way trip flights
	private List<Flight> handleOneWayTrip(String origin, String destination, String departureDate,
			int numOfTravellers) {
		List<Flight> availableFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(origin, destination,
				departureDate);

// Filter flights based on available seats
		return filterFlightsBySeats(availableFlights, numOfTravellers);
	}

//Helper method to handle round-trip flights
	private List<Flight> handleRoundTrip(String origin, String destination, String departureDate, String returnDate,
			int numOfTravellers) {
// Fetch outbound flights (origin to destination)
		List<Flight> outboundFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(origin, destination,
				departureDate);

// Fetch return flights (destination back to origin)
		List<Flight> returnFlights = flightRepository.findByOriginAndDestinationAndDepartureDate(destination, origin,
				returnDate);

// Filter both lists based on available seats
		List<Flight> matchingOutboundFlights = filterFlightsBySeats(outboundFlights, numOfTravellers);
		List<Flight> matchingReturnFlights = filterFlightsBySeats(returnFlights, numOfTravellers);

// Combine outbound and return flights into one list for round-trip
		List<Flight> matchingFlights = new ArrayList<>();
		matchingFlights.addAll(matchingOutboundFlights);
		matchingFlights.addAll(matchingReturnFlights);

		return matchingFlights;
	}

//Helper method to filter flights by available seats
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
	
	public String bookSeats(Long flightId, List<String> seatNumbers) {
	    Optional<Flight> flightOptional = flightRepository.findById(flightId);

	    if (flightOptional.isPresent()) {
	        Flight flight = flightOptional.get();

	        // Retrieve seat data from JSON
	        Map<String, Map<String, Boolean>> seatData = flight.getSeatData();
	        
	        StringBuilder resultMessage = new StringBuilder();
	        int successfullyBooked = 0;
	        int failedBooking = 0;

	        // Iterate through the list of seat numbers
	        for (String seatNumber : seatNumbers) {
	            boolean seatBooked = false;

	            // Find the seat type (First, Business, Economy) that contains the given seat number
	            for (Map.Entry<String, Map<String, Boolean>> entry : seatData.entrySet()) {
	                Map<String, Boolean> seats = entry.getValue();

	                if (seats.containsKey(seatNumber)) {
	                    Boolean isAvailable = seats.get(seatNumber);

	                    if (isAvailable != null && isAvailable) {
	                        // Book the seat by setting it to false (unavailable)
	                        seats.put(seatNumber, false);
	                        successfullyBooked++;

	                        // Update the seats map in the flight object
	                        flight.setSeatData(seatData); // Store the updated seat data back as JSON

	                        // Update available seats count
	                        flight.setAvailableSeats(flight.getAvailableSeats() - 1);

	                        seatBooked = true;
	                        break; // Break the inner loop once the seat is found and booked
	                    } else if (isAvailable == null) {
	                        failedBooking++;
	                        resultMessage.append("Seat " + seatNumber + " does not exist. ");
	                        break;
	                    } else {
	                        failedBooking++;
	                        resultMessage.append("Seat " + seatNumber + " is already booked. ");
	                        break;
	                    }
	                }
	            }

	            // If the seat was not found in any seat type
	            if (!seatBooked) {
	                resultMessage.append("Seat " + seatNumber + " was not found. ");
	            }
	        }

	        // Save the updated flight
	        flightRepository.save(flight);

	        // Final result message
	        resultMessage.insert(0, "Booking Result: ");
	        resultMessage.append("\nSuccessfully booked: " + successfullyBooked + " seats. ");
	        resultMessage.append("Failed to book: " + failedBooking + " seats.");
	        return resultMessage.toString();
	    } else {
	        return "Flight with ID " + flightId + " not found.";
	    }
	}


}
