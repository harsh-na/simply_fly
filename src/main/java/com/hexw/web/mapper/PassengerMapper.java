package com.hexw.web.mapper;

import com.hexw.web.dto.PassengerDTO;
import com.hexw.web.models.Passengers;

public class PassengerMapper {

    // Convert Entity to DTO
    public static PassengerDTO toPassengerDTO(Passengers passenger) {
        PassengerDTO passengerDTO = new PassengerDTO();
        passengerDTO.setPassengerId(passenger.getPassengerId());
        passengerDTO.setFullName(passenger.getFullName());
        passengerDTO.setAge(passenger.getAge());
        passengerDTO.setEmail(passenger.getEmail());
        passengerDTO.setPhone(passenger.getPhone());
        passengerDTO.setSeatType(passenger.getSeatType());
        passengerDTO.setSeatNo(passenger.getSeatNo());
        return passengerDTO;
    }

    // Convert DTO to Entity (if needed)
    public static Passengers toPassengerEntity(PassengerDTO passengerDTO) {
        Passengers passenger = new Passengers();
        passenger.setPassengerId(passengerDTO.getPassengerId());
        passenger.setFullName(passengerDTO.getFullName());
        passenger.setAge(passengerDTO.getAge());
        passenger.setEmail(passengerDTO.getEmail());
        passenger.setPhone(passengerDTO.getPhone());
        passenger.setSeatType(passengerDTO.getSeatType());
        passenger.setSeatNo(passengerDTO.getSeatNo());
        return passenger;
    }
}
