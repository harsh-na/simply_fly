package com.hexw.web.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @NotNull(message = "User ID is required")
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotNull(message = "Flight ID is required")
    @Column(name = "flight_id", nullable = false)
    private Long flightId;

    @NotBlank(message = "Origin is required")
    @Size(max = 50, message = "Origin should not exceed 50 characters")
    @Column(name = "origin", nullable = false, length = 50)
    private String origin;

    @NotBlank(message = "Destination is required")
    @Size(max = 50, message = "Destination should not exceed 50 characters")
    @Column(name = "destination", nullable = false, length = 50)
    private String destination;

    @NotNull(message = "Payment ID is required")
    @Column(name = "payment_id", nullable = false)
    private Long paymentId;

    @NotNull(message = "Seat number is required")
    @Min(value = 1, message = "Seat number must be at least 1")
    @Column(name = "seat_no", nullable = false)
    private Integer seatNo;

    @NotBlank(message = "Booking status is required")
    @Column(name = "booking_status", nullable = false)
    private String bookingStatus;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Total amount should have up to 10 digits and 2 decimal places")
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    public Booking() {
    }

    @Override
	public String toString() {
		return "Booking [bookingId=" + bookingId + ", userId=" + userId + ", flightId=" + flightId + ", origin="
				+ origin + ", destination=" + destination + ", paymentId=" + paymentId + ", seatNo=" + seatNo
				+ ", bookingStatus=" + bookingStatus + ", totalAmount=" + totalAmount + "]";
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

	public Integer getSeatNo() {
		return seatNo;
	}

	public void setSeatNo(Integer seatNo) {
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

	public Booking(Long userId, Long flightId, String origin, String destination, Long paymentId, Integer seatNo, String bookingStatus, BigDecimal totalAmount) {
        this.userId = userId;
        this.flightId = flightId;
        this.origin = origin;
        this.destination = destination;
        this.paymentId = paymentId;
        this.seatNo = seatNo;
        this.bookingStatus = bookingStatus;
        this.totalAmount = totalAmount;
    }
}
