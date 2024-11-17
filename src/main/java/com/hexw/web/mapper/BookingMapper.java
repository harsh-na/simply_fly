package com.hexw.web.mapper;

import com.hexw.web.models.Booking;
import com.hexw.web.dto.BookingDTO;

import java.util.List;
import java.util.stream.Collectors;

public class BookingMapper {

    // Method to map a Booking to a BookingDTO (for response or data transfer)
    public static BookingDTO toBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setBookingId(booking.getBookingId());
        bookingDTO.setUserId(booking.getUserId());
        bookingDTO.setFlightId(booking.getFlightId());
        bookingDTO.setOrigin(booking.getOrigin());
        bookingDTO.setDestination(booking.getDestination());
        bookingDTO.setPaymentId(booking.getPaymentId());
        bookingDTO.setSeatNo(booking.getSeatNo());
        bookingDTO.setBookingStatus(booking.getBookingStatus());
        bookingDTO.setTotalAmount(booking.getTotalAmount());

        return bookingDTO;
    }

    // Method to map a list of Booking objects to a list of BookingDTO objects
    public static List<BookingDTO> toBookingDTOList(List<Booking> bookings) {
        return bookings.stream()
                       .map(BookingMapper::toBookingDTO)
                       .collect(Collectors.toList());
    }

    // Method to map a BookingDTO to a Booking entity (for saving data)
    public static Booking toBookingEntity(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setBookingId(bookingDTO.getBookingId());
        booking.setUserId(bookingDTO.getUserId());
        booking.setFlightId(bookingDTO.getFlightId());
        booking.setOrigin(bookingDTO.getOrigin());
        booking.setDestination(bookingDTO.getDestination());
        booking.setPaymentId(bookingDTO.getPaymentId());
        booking.setSeatNo(bookingDTO.getSeatNo());
        booking.setBookingStatus(bookingDTO.getBookingStatus());
        booking.setTotalAmount(bookingDTO.getTotalAmount());

        return booking;
    }
}
