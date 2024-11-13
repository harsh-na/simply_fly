package com.hexw.web.Models;

import java.time.LocalDate;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "flights")
public class Flight {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long flightId;

	@NotNull(message = "Company ID is required.")
	@Column(nullable = false)
	private Long companyId;

	@NotBlank(message = "Flight number is required.")
	@Column(nullable = false, unique = true)
	private String flightNo;

	@NotBlank(message = "Origin is required.")
	@Column(nullable = false)
	private String origin;

	@NotBlank(message = "Destination is required.")
	@Column(nullable = false)
	private String destination;

	@Min(value = 1, message = "Total seats must be at least 1.")
	@Column(nullable = false)
	private Integer totalSeats;

	@Min(value = 0, message = "Available seats cannot be negative.")
	@Column(nullable = false)
	private Integer availableSeats;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String seatTypes; // JSON or TEXT to represent seat types

	@Min(value = 0, message = "Fare cannot be negative.")
	@Column(nullable = false)
	private Integer fare;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String baggageInfo;

	@Column
	private Long bookingId;

	@NotNull(message = "Date of flight is required.")
	@Temporal(TemporalType.DATE)
	private Date date;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String timings;

	@Column(name = "departure_date")
	private LocalDate departureDate;

	@Column(name = "return_date")
	private LocalDate returnDate;

	@Override
	public String toString() {
		return "Flight [flightId=" + flightId + ", companyId=" + companyId + ", flightNo=" + flightNo + ", origin="
				+ origin + ", destination=" + destination + ", totalSeats=" + totalSeats + ", availableSeats="
				+ availableSeats + ", seatTypes=" + seatTypes + ", fare=" + fare + ", baggageInfo=" + baggageInfo
				+ ", bookingId=" + bookingId + ", date=" + date + ", timings=" + timings + ", departureDate="
				+ departureDate + ", returnDate=" + returnDate + "]";
	}

	public Flight() {
		
	}

	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getFlightNo() {
		return flightNo;
	}

	public void setFlightNo(String flightNo) {
		this.flightNo = flightNo;
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

	public Integer getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(Integer totalSeats) {
		this.totalSeats = totalSeats;
	}

	public Integer getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(Integer availableSeats) {
		this.availableSeats = availableSeats;
	}

	public String getSeatTypes() {
		return seatTypes;
	}

	public void setSeatTypes(String seatTypes) {
		this.seatTypes = seatTypes;
	}

	public Integer getFare() {
		return fare;
	}

	public void setFare(Integer fare) {
		this.fare = fare;
	}

	public String getBaggageInfo() {
		return baggageInfo;
	}

	public void setBaggageInfo(String baggageInfo) {
		this.baggageInfo = baggageInfo;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getTimings() {
		return timings;
	}

	public void setTimings(String timings) {
		this.timings = timings;
	}

	public Flight(Long flightId, Long companyId, String flightNo, String origin, String destination, Integer totalSeats,
			Integer availableSeats, String seatTypes, Integer fare, String baggageInfo, Long bookingId, Date date,
			String timings, LocalDate departureDate, LocalDate returnDate) {
		super();
		this.flightId = flightId;
		this.companyId = companyId;
		this.flightNo = flightNo;
		this.origin = origin;
		this.destination = destination;
		this.totalSeats = totalSeats;
		this.availableSeats = availableSeats;
		this.seatTypes = seatTypes;
		this.fare = fare;
		this.baggageInfo = baggageInfo;
		this.bookingId = bookingId;
		this.date = date;
		this.timings = timings;
		this.departureDate = departureDate;
		this.returnDate = returnDate;
	}

	public LocalDate getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(LocalDate departureDate) {
		this.departureDate = departureDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}
}