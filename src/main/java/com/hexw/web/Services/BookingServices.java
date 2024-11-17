package com.hexw.web.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexw.web.dao.BookingRepo;
import com.hexw.web.dao.FlightRepo;
import com.hexw.web.dao.PassengerRepo;
import com.hexw.web.dto.PassengerDTO;
import com.hexw.web.models.Booking;
import com.hexw.web.models.Flight;
import com.hexw.web.models.Passengers;

import jakarta.transaction.Transactional;


@Service
public class BookingServices {
	
	 @Autowired
	    private FlightRepo flightRepository;
	    
	    @Autowired
	    private PassengerRepo passengerRepository;
	    
	    @Autowired
	    private BookingRepo bookingRepository;
	    
	    @Transactional
	    public String bookSeats(Long flightId, List<String> seatNumbers, Long userId, Long paymentId, List<PassengerDTO> passengersDTO) {
	        Optional<Flight> flightOptional = flightRepository.findById(flightId);

	        if (flightOptional.isPresent()) {
	            Flight flight = flightOptional.get();

	            // Ensure that the seat numbers exist and are available
	            Map<String, Boolean> seatData = flight.getSeats();
	            List<Booking> bookings = new ArrayList<>();
	            List<Passengers> passengers = new ArrayList<>();

	            // Keep track of all booked seat numbers for this booking
	            List<String> bookedSeatNumbers = new ArrayList<>();

	            for (int i = 0; i < seatNumbers.size(); i++) {
	                String seatNumber = seatNumbers.get(i);
	                PassengerDTO passengerDTO = passengersDTO.get(i);

	                // Book the seat and update availability
	                seatData.put(seatNumber, false);
	                flight.setAvailableSeats(flight.getAvailableSeats() - 1);

	                // Convert seat number to integer and add to the list of booked seat numbers
	                bookedSeatNumbers.add(seatNumber);

	                // Create passenger details
	                Passengers passenger = new Passengers();
	                passenger.setFullName(passengerDTO.getFullName());
	                passenger.setAge(passengerDTO.getAge());
	                passenger.setEmail(passengerDTO.getEmail());
	                passenger.setPhone(passengerDTO.getPhone());
	                passenger.setSeatType(passengerDTO.getSeatType());
	                passenger.setSeatNo(seatNumber);

	                // Add the passenger to the list
	                passengers.add(passenger);
	            }

	            // Create a new booking for the entire booking process
	            Booking booking = new Booking();
	            booking.setUserId(userId);
	            booking.setFlightId(flightId);
	            booking.setOrigin(flight.getOrigin());
	            booking.setDestination(flight.getDestination());
	            booking.setPaymentId(paymentId);
	            booking.setSeatNo(bookedSeatNumbers); // Set the list of seat numbers
	            booking.setBookingStatus("CONFIRMED");
	            booking.setTotalAmount(flight.getFare().multiply(new BigDecimal(seatNumbers.size())));

	            // Save the booking and passengers to the database
	            bookingRepository.save(booking);
	            passengerRepository.saveAll(passengers);

	            // Update flight seats and save the flight
	            flight.setSeats(seatData);
	            flightRepository.save(flight);

	            return "Seats " + seatNumbers + " have been successfully booked.";
	        }

	        return null;
	    }

}
