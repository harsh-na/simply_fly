package com.hexw.web.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "booking_passengers")
public class BookingPassenger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NotNull(message = "Booking ID is required")
	@Column(name = "booking_id", nullable = false)
	private Long bookingId;

	@NotNull(message = "Passenger ID is required")
	@Column(name = "passenger_id", nullable = false)
	private Long passengerId;

	@NotNull(message = "Amount is required")
	@DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
	@Digits(integer = 10, fraction = 2, message = "Amount should have up to 10 digits and 2 decimal places")
	@Column(name = "amount", nullable = false, precision = 10, scale = 2)
	private BigDecimal amount;

	// Default constructor
	public BookingPassenger() {
	}

	// All-args constructor
	public BookingPassenger(Long bookingId, Long passengerId, BigDecimal amount) {
		this.bookingId = bookingId;
		this.passengerId = passengerId;
		this.amount = amount;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "BookingPassenger [id=" + id + ", bookingId=" + bookingId + ", passengerId=" + passengerId + ", amount="
				+ amount + "]";
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public Long getPassengerId() {
		return passengerId;
	}

	public void setPassengerId(Long passengerId) {
		this.passengerId = passengerId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
}
