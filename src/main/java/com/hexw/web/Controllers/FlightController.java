package com.hexw.web.controllers;

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

import com.hexw.web.models.Flight;
import com.hexw.web.dto.FlightDTO;
import com.hexw.web.services.FlightServices;
import com.hexw.web.mapper.FlightMapper;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

	@Autowired
	private FlightServices flightService;

	@PostMapping("/add")
	public ResponseEntity<FlightDTO> addFlight(@RequestBody FlightDTO flightDTO) {
		// Convert DTO to Entity using FlightMapper
		Flight flight = FlightMapper.toFlightEntity(flightDTO);
		Flight savedFlight = flightService.addFlight(flight);
		// Convert saved Flight entity back to DTO and return it
		FlightDTO savedFlightDTO = FlightMapper.toFlightDTO(savedFlight);
		return ResponseEntity.ok(savedFlightDTO);
	}

	@GetMapping("/{flightId}")
	public ResponseEntity<FlightDTO> getFlightById(@PathVariable Long flightId) {
	    Optional<FlightDTO> flightDTO = flightService.getFlightById(flightId);
	    return flightDTO.map(ResponseEntity::ok)  // Directly return FlightDTO from service
	                    .orElseGet(() -> ResponseEntity.notFound().build()); // Return 404 if not found
	}

	@GetMapping("/search")
	public ResponseEntity<List<FlightDTO>> searchFlights(@RequestParam String tripType, @RequestParam String origin,
			@RequestParam String destination, @RequestParam List<String> dates, @RequestParam int numOfTravellers) {

		try {
			List<FlightDTO> flights = flightService.searchFlights(tripType, origin, destination, dates, numOfTravellers);
			
			// Return the DTO list
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
	public ResponseEntity<FlightDTO> updateFlight(@PathVariable Long flightId, @RequestBody FlightDTO flightDTO) {
		// Convert DTO to Entity using FlightMapper
		Flight flightDetails = FlightMapper.toFlightEntity(flightDTO);
		Flight updatedFlight = flightService.updateFlight(flightId, flightDetails);
		// Convert the updated Flight entity back to DTO and return it
		FlightDTO updatedFlightDTO = FlightMapper.toFlightDTO(updatedFlight);
		return ResponseEntity.ok(updatedFlightDTO);
	}

	@DeleteMapping("/delete/{flightId}")
	public ResponseEntity<Void> deleteFlight(@PathVariable Long flightId) {
		flightService.deleteFlight(flightId);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/all")
	public List<FlightDTO> getAllFlights() {
		List<Flight> flights = flightService.getAllFlights();
		// Convert the list of Flight entities to DTOs
		List<FlightDTO> flightDTOs = FlightMapper.toFlightDTOList(flights);
		return flightDTOs;
	}
}
