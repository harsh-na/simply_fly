package com.hexw.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexw.web.dao.PassengerRepo;
import com.hexw.web.mapper.PassengerMapper;
import com.hexw.web.models.Passengers;
import com.hexw.web.dto.PassengerDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PassengerServices {

    @Autowired
    private PassengerRepo passengerRepository;

    // Get all passengers
    public List<PassengerDTO> getAllPassengers() {
        List<Passengers> passengers = passengerRepository.findAll();
        // Convert each Passenger entity to PassengerDTO using the mapper
        return passengers.stream()
                         .map(PassengerMapper::toPassengerDTO)
                         .collect(Collectors.toList());
    }

    // Get a single passenger by ID
    public PassengerDTO getPassengerById(Long passengerId) {
        Optional<Passengers> passenger = passengerRepository.findById(passengerId);
        // If passenger is found, convert to DTO; otherwise, return null
        return passenger.map(PassengerMapper::toPassengerDTO).orElse(null);
    }

    // Create a new passenger
    public PassengerDTO createPassenger(PassengerDTO passengerDTO) {
        // Convert the DTO to an entity
        Passengers passenger = PassengerMapper.toPassengerEntity(passengerDTO);
        // Save the entity and return the DTO
        Passengers savedPassenger = passengerRepository.save(passenger);
        return PassengerMapper.toPassengerDTO(savedPassenger);
    }

    // Update an existing passenger
    public PassengerDTO updatePassenger(Long passengerId, PassengerDTO updatedPassengerDTO) {
        return passengerRepository.findById(passengerId)
                .map(existingPassenger -> {
                    // Update the existing entity using data from the DTO
                    existingPassenger.setFullName(updatedPassengerDTO.getFullName());
                    existingPassenger.setAge(updatedPassengerDTO.getAge());
                    existingPassenger.setEmail(updatedPassengerDTO.getEmail());
                    existingPassenger.setPhone(updatedPassengerDTO.getPhone());
                    existingPassenger.setSeatType(updatedPassengerDTO.getSeatType());
                    existingPassenger.setSeatNo(updatedPassengerDTO.getSeatNo());
                    // Save the updated entity and return the DTO
                    Passengers updatedPassenger = passengerRepository.save(existingPassenger);
                    return PassengerMapper.toPassengerDTO(updatedPassenger);
                })
                .orElse(null); // Return null if passenger not found
    }

    // Delete a passenger by ID
    public boolean deletePassenger(Long passengerId) {
        if (passengerRepository.existsById(passengerId)) {
            passengerRepository.deleteById(passengerId);
            return true;
        }
        return false;
    }
}
