package com.hexw.web.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexw.web.dao.BookingRepo;
import com.hexw.web.dao.FlightRepo;
import com.hexw.web.dao.PassengerRepo;
import com.hexw.web.dao.PaymentRepo;
import com.hexw.web.dto.PassengerDTO;
import com.hexw.web.models.Booking;
import com.hexw.web.models.Flight;
import com.hexw.web.models.Passengers;
import com.hexw.web.models.Payments;

import jakarta.transaction.Transactional;

@Service
public class BookingServices {

	@Autowired
	private FlightRepo flightRepository;

	@Autowired
	private PassengerRepo passengerRepository;

	@Autowired
	private BookingRepo bookingRepository;

	@Autowired
	private PaymentRepo paymentRepository;

//	@Transactional
//	public String bookSeats(Long flightId, List<String> seatNumbers, Long userId, 
//			List<PassengerDTO> passengersDTO) {
//		Optional<Flight> flightOptional = flightRepository.findById(flightId);
//
//		if (flightOptional.isPresent()) {
//			Flight flight = flightOptional.get();
//
//			// Ensure that the seat numbers exist and are available
//			Map<String, Boolean> seatData = flight.getSeats();
////			List<Booking> bookings = new ArrayList<>();
//			List<Passengers> passengers = new ArrayList<>();
//
//			// Keep track of all booked seat numbers for this booking
//			List<String> bookedSeatNumbers = new ArrayList<>();
//
//			for (int i = 0; i < seatNumbers.size(); i++) {
//				String seatNumber = seatNumbers.get(i);
//				PassengerDTO passengerDTO = passengersDTO.get(i);
//
//				// Book the seat and update availability
//				seatData.put(seatNumber, false);
//				flight.setAvailableSeats(flight.getAvailableSeats() - 1);
//
//				// Convert seat number to integer and add to the list of booked seat numbers
//				bookedSeatNumbers.add(seatNumber);
//
//				// Create passenger details
//				Passengers passenger = new Passengers();
//				passenger.setFullName(passengerDTO.getFullName());
//				passenger.setAge(passengerDTO.getAge());
//				passenger.setEmail(passengerDTO.getEmail());
//				passenger.setPhone(passengerDTO.getPhone());
//				passenger.setSeatType(passengerDTO.getSeatType());
//				passenger.setSeatNo(seatNumber);
//
//				// Add the passenger to the list
//				passengers.add(passenger);
//			}
//
//			Optional<Payments> paymentOptional = paymentRepository.findByUserId(userId);
//
//			if (paymentOptional.isPresent()) {
//				Payments payment = paymentOptional.get();
//
//				// Check if the payment was successful
//				if (!payment.getBookingStatus().equals("SUCCESS")) {
//					// Payment failed, do not proceed with booking
//					return "Payment was not successful. Please try again.";
//				}
//				
//				payment.setUserId(userId);
//				payment.setPaymentDate(new Date());
//				payment.setAmount(flight.getFare().multiply(new BigDecimal(seatNumbers.size())));
//				payment.setTransactionId("7412");
//				payment.setBookingStatus("SUCCESS");
//				paymentRepository.save(payment);
//				
//				Booking booking = new Booking();
//				booking.setUserId(userId);
//				booking.setFlightId(flightId);
//				booking.setOrigin(flight.getOrigin());
//				booking.setDestination(flight.getDestination());
//				booking.setPaymentId(payment.getPaymentId());
//				booking.setSeatNo(bookedSeatNumbers); // Set the list of seat numbers
//				booking.setBookingStatus("CONFIRMED");
//				booking.setTotalAmount(flight.getFare().multiply(new BigDecimal(seatNumbers.size())));
//
//				// Save the booking and passengers to the database
//				bookingRepository.save(booking);
//				passengerRepository.saveAll(passengers);
//
//				// Update flight seats and save the flight
//				flight.setSeats(seatData);
//				flightRepository.save(flight);
//
//				return "Seats " + seatNumbers + " have been successfully booked.";
//
//			} else {
//				// Payment details not found
//				return "Payment not found. Please check your payment details.";
//			}
//
//			// Create a new booking for the entire booking process
//
//		}
//
//		return null;
//	}
	
	@Transactional
	public String bookSeats(Long flightId, List<String> seatNumbers, Long userId, List<PassengerDTO> passengersDTO) {
	    Optional<Flight> flightOptional = flightRepository.findById(flightId);

	    // Check if the flight exists
	    if (!flightOptional.isPresent()) {
	        return "Flight not found.";
	    }

	    Flight flight = flightOptional.get();
	    
	    System.out.println( flight);
	    // Ensure that the seat numbers exist and are available
	    Map<String, Boolean> seatData = flight.getSeats();
	    System.out.println( flight.getSeats());
	    List<Passengers> passengers = new ArrayList<>();
	    List<String> bookedSeatNumbers = new ArrayList<>();

	    // Book the seats and gather passenger details
	    for (int i = 0; i < seatNumbers.size(); i++) {
	        String seatNumber = seatNumbers.get(i);
	        PassengerDTO passengerDTO = passengersDTO.get(i);
	        
	        // Check if the seat is available
	        if (!seatData.containsKey(seatNumber) || !seatData.get(seatNumber)) {
	            return "Seat " + seatNumber + " is not available."; // Seat not available
	        }

	        // Mark the seat as booked (set the value to false)
	        seatData.put(seatNumber, false);
	        flight.setAvailableSeats(flight.getAvailableSeats() - 1);
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

	    // Retrieve or create payment details based on userId
	    Payments payment = paymentRepository.findByUserId(userId).orElseGet(() -> {
	        // Create a new payment if none exists for the user
	        Payments newPayment = new Payments();
	        newPayment.setUserId(userId);
	        newPayment.setPaymentDate(new Date());
	        newPayment.setAmount(flight.getFare().multiply(new BigDecimal(seatNumbers.size())));
	        newPayment.setTransactionId("7412");  // Hardcoded for this example
	        newPayment.setBookingStatus("success");  // Set payment to success by default
	        return paymentRepository.save(newPayment);
	    });

	    // Check if the payment is successful
	    if (!"success".equals(payment.getBookingStatus())) {
	        return "Payment was not successful. Please try again.";
	    }

	    // Create the booking now that payment is confirmed
	    Booking booking = new Booking();
	    booking.setUserId(userId);
	    booking.setFlightId(flightId);
	    booking.setOrigin(flight.getOrigin());
	    booking.setDestination(flight.getDestination());
	    booking.setPaymentId(payment.getPaymentId());
	    booking.setSeatNo(bookedSeatNumbers);  // Set the list of seat numbers
	    booking.setBookingStatus("CONFIRMED");
	    booking.setTotalAmount(flight.getFare().multiply(new BigDecimal(seatNumbers.size())));

	    // Save the booking, passengers, and updated flight details to the database
	    bookingRepository.save(booking);
	    
	    for (Passengers passenger : passengers) {
	    	
	        passenger.setBookingId(booking.getBookingId()); // Associate booking ID
	    }
	    passengerRepository.saveAll(passengers);

	    // Update the flight seat availability
	    flight.setSeats(seatData);
	    flightRepository.save(flight);

	    return "Seats " + seatNumbers + " have been successfully booked.";
	}


}

//
// payment status(userid)
//if true
//booking id->create (payment,booking)
//flight(seats status)
