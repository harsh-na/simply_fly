package com.hexw.web.Controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexw.web.Models.Flight;
import com.hexw.web.Services.FlightServices;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

	@Autowired
	private FlightServices flightService;

	@PostMapping("/add")
	public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
		Flight savedFlight = flightService.addFlight(flight);
		return ResponseEntity.ok(savedFlight);
	}

	@GetMapping("/{flightId}")
	public ResponseEntity<Flight> getFlightById(@PathVariable Long flightId) {
		Optional<Flight> flight = flightService.getFlightById(flightId);
		return flight.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/search")
	public ResponseEntity<List<Flight>> searchFlights(@RequestParam String tripType, @RequestParam String origin,
			@RequestParam String destination, @RequestParam List<String> dates, @RequestParam int numOfTravellers) {

		try {
			List<Flight> flights = flightService.searchFlights(tripType, origin, destination, dates, numOfTravellers);

			// Return HTTP 200 (OK) with the list of flights if the search is successful
			return new ResponseEntity<>(flights, HttpStatus.OK);

		} catch (IllegalArgumentException ex) {
			// Return HTTP 400 (Bad Request) if there's an input error
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} catch (Exception ex) {
			// Return HTTP 500 (Internal Server Error) for any other errors
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update/{flightId}")
	public ResponseEntity<Flight> updateFlight(@PathVariable Long flightId, @RequestBody Flight flightDetails) {
		Flight updatedFlight = flightService.updateFlight(flightId, flightDetails);
		return ResponseEntity.ok(updatedFlight);
	}

	@DeleteMapping("/delete/{flightId}")
	public ResponseEntity<Void> deleteFlight(@PathVariable Long flightId) {
		flightService.deleteFlight(flightId);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/all")
	public List<Flight> getAllFlights() {
		return flightService.getAllFlights();
	}
	@PostMapping("/{flightId}/book-seat")
    public String bookSeat(
            @PathVariable Long flightId,
            @RequestParam List<String> seatNumber) {
        return flightService.bookSeats(flightId, seatNumber);
    }

}
