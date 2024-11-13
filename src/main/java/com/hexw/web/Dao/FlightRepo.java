package com.hexw.web.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexw.web.Models.Flight;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Long> {

	List<Flight> findByOriginAndDestinationAndDepartureDateAndReturnDate(String origin, String destination,
			LocalDate departureDate, LocalDate returnDate);

	List<Flight> findByOriginAndDestinationAndDepartureDate(String origin, String destination, LocalDate departureDate);
}
