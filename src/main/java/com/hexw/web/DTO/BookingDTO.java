package com.hexw.web.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class BookingDTO {

    private Long bookingId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Flight ID is required")
    private Long flightId;

    @NotBlank(message = "Origin is required")
    @Size(max = 50, message = "Origin should not exceed 50 characters")
    private String origin;

    @NotBlank(message = "Destination is required")
    @Size(max = 50, message = "Destination should not exceed 50 characters")
    private String destination;

    @NotNull(message = "Payment ID is required")
    private Long paymentId;

    @NotEmpty
    @ElementCollection
    @Column(columnDefinition = "TEXT")
//    @Min(value = 1, message = "Seat number must be at least 1")
    private List<String> seatNo;

    @NotBlank(message = "Booking status is required")
    private String bookingStatus;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Total amount should have up to 10 digits and 2 decimal places")
    private BigDecimal totalAmount;
    
    private List<PassengerDTO> passengers;

    public BookingDTO() {
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public List<String> getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(List<String> seatNo) {
        this.seatNo = seatNo;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public List<PassengerDTO> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<PassengerDTO> passengers) {
        this.passengers = passengers;
    }
}
