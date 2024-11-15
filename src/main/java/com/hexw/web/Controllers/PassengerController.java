package com.hexw.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hexw.web.dto.PassengerDTO;
import com.hexw.web.services.PassengerServices;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {

    @Autowired
    private PassengerServices passengerService;

    // Get all passengers
    @GetMapping("/getAll")
    public List<PassengerDTO> getAllPassengers() {
        return passengerService.getAllPassengers();
    }

    // Get a single passenger by ID
    @GetMapping("/{id}")
    public ResponseEntity<PassengerDTO> getPassengerById(@PathVariable("id") Long passengerId) {
        PassengerDTO passengerDTO = passengerService.getPassengerById(passengerId);
        if (passengerDTO != null) {
            return ResponseEntity.ok(passengerDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new passenger
    @PostMapping("/add")
    public ResponseEntity<PassengerDTO> createPassenger(@RequestBody PassengerDTO passengerDTO) {
        PassengerDTO createdPassenger = passengerService.createPassenger(passengerDTO);
        return ResponseEntity.ok(createdPassenger);
    }

    // Update an existing passenger
    @PutMapping("/{id}")
    public ResponseEntity<PassengerDTO> updatePassenger(@PathVariable("id") Long passengerId,
            @RequestBody PassengerDTO passengerDTO) {
        PassengerDTO updatedPassenger = passengerService.updatePassenger(passengerId, passengerDTO);
        if (updatedPassenger != null) {
            return ResponseEntity.ok(updatedPassenger);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a passenger by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePassenger(@PathVariable("id") Long passengerId) {
        boolean deleted = passengerService.deletePassenger(passengerId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
