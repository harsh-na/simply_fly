package com.hexw.web.controllers;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexw.web.dto.BookingDTO;
import com.hexw.web.services.BookingServices;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingServices bookingService;

    @PostMapping("/bookSeats")
    public ResponseEntity<String> bookSeats(@RequestBody BookingDTO bookingRequest) {
        String result = bookingService.bookSeats(
                bookingRequest.getFlightId(),
                bookingRequest.getSeatNo(),
                bookingRequest.getUserId(),
                bookingRequest.getPassengers() // Assuming you have passengers in the DTO
        );

        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Booking failed.");
        }
    }

}
