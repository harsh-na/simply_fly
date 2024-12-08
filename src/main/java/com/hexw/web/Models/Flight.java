package com.hexw.web.models;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "flights")
public class Flight {

	// ObjectMapper instance for handling JSON
	private static final ObjectMapper objectMapper = new ObjectMapper();

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
	private BigDecimal fare;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String baggageInfo;

	@Column
	private Long bookingId;

	// Use JSON to store dates
	@Column(columnDefinition = "JSON")
	private String dates;

	@Column(columnDefinition = "JSON")
	private String timings;

	@Column(columnDefinition = "JSON")
	private String seats;

	public Flight() {

	}

	@Override
	public String toString() {
		return "Flight [flightId=" + flightId + ", companyId=" + companyId + ", flightNo=" + flightNo + ", origin="
				+ origin + ", destination=" + destination + ", totalSeats=" + totalSeats + ", availableSeats="
				+ availableSeats + ", seatTypes=" + seatTypes + ", fare=" + fare + ", baggageInfo=" + baggageInfo
				+ ", bookingId=" + bookingId + ", dates=" + dates + ", timings=" + timings + ", seats=" + seats + "]";
	}

	// Custom getter for seats
	public Map<String, Boolean> getSeats() {
		try {
			if (seats != null && !seats.isEmpty()) {
				objectMapper.findAndRegisterModules();
				// Ensure proper modules for JSON parsing are loaded
				System.out.println("Parsed seats map: "+seats);
				Map<String, Boolean> parsedSeats = objectMapper.readValue(seats,
						new TypeReference<Map<String, Boolean>>() {
						});
				System.out.println("Parsed seats map: " + parsedSeats);
				return parsedSeats;
			} else {
				// Return an empty map if seats is null or empty
				System.out.println("Seats field is null or empty.");
				return new HashMap<>();
			}
		} catch (JsonProcessingException e) {
			System.err.println("Error parsing seats JSON: " + e.getMessage());
			e.printStackTrace();
			return new HashMap<>(); // Return empty map on parsing error
		}
	}

	// Custom setter for seats
	public void setSeats(Map<String, Boolean> seatList) {
		try {
			if (seatList != null) {
				this.seats = objectMapper.writeValueAsString(seatList);
			} else {
				// Initialize with empty JSON object if seatList is null
				this.seats = "{}";
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

	// Getters and setters for other fields

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

	public BigDecimal getFare() {
		return fare;
	}

	public void setFare(BigDecimal fare) {
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

	// Getters and setters for dates
	public List<String> getDates() {
		try {
			return objectMapper.readValue(this.dates, new TypeReference<List<String>>() {
			});
		} catch (Exception e) {
			throw new RuntimeException("Failed to parse dates JSON", e);
		}
	}

	public void setDates(List<String> dates) {
		try {
			this.dates = objectMapper.writeValueAsString(dates);
		} catch (Exception e) {
			throw new RuntimeException("Failed to convert dates to JSON", e);
		}
	}

	// Custom getter for timings
	public List<Map<String, String>> getTimings() {
		try {
			if (timings != null) {
				objectMapper.findAndRegisterModules(); // Register JavaTimeModule for date-time parsing
				return objectMapper.readValue(timings, new TypeReference<List<Map<String, String>>>() {
				});
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}

	// Custom setter for timings
	public void setTimings(List<Map<String, String>> timingsList) {
		try {
			if (timingsList != null) {
				this.timings = objectMapper.writeValueAsString(timingsList);
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

	public Flight(Long flightId, Long companyId, String flightNo, String origin, String destination, Integer totalSeats,
			Integer availableSeats, String seatTypes, BigDecimal fare, String baggageInfo, Long bookingId, String dates,
			String timings, String seats) {
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
		this.dates = dates;
		this.timings = timings;
		this.seats = seats;
	}

}