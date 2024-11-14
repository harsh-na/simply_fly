package com.hexw.web.Models;

import java.io.IOException;
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

	// Use JSON to store dates
	@Column(columnDefinition = "JSON")
	private String dates;

	@Column(columnDefinition = "JSON")
	private String timings;

    @Column(columnDefinition = "JSON")
    @NotNull
    private String seats; // JSON to represent seat availability data

	public Flight() {

	}

	@Override
	public String toString() {
		return "Flight [flightId=" + flightId + ", companyId=" + companyId + ", flightNo=" + flightNo + ", origin="
				+ origin + ", destination=" + destination + ", totalSeats=" + totalSeats + ", availableSeats="
				+ availableSeats + ", seatTypes=" + seatTypes + ", fare=" + fare + ", baggageInfo=" + baggageInfo
				+ ", bookingId=" + bookingId + ", dates=" + dates + ", timings=" + timings + ", seats=" + seats + "]";
	}

	

    // Method to deserialize the seat data (seats field)
    public Map<String, Map<String, Boolean>> getSeatData() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Convert JSON string to a Map
            return objectMapper.readValue(seats, new TypeReference<Map<String, Map<String, Boolean>>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Method to serialize seat data into the 'seats' field
    public void setSeatData(Map<String, Map<String, Boolean>> seatData) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Convert Map to JSON and store in the seats field
            this.seats = objectMapper.writeValueAsString(seatData);
        } catch (IOException e) {
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

	// ObjectMapper instance for handling JSON
	private static final ObjectMapper objectMapper = new ObjectMapper();

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

	public Flight(Long flightId,  Long companyId,
            String flightNo,
             String origin,
             String destination,
             Integer totalSeats,
             Integer availableSeats,
            String seatTypes,
             Integer fare,
            String baggageInfo, Long bookingId,
            String dates, String timings, String seats) {
  
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

  // Initialize JSON fields with default empty values if they are null
  this.dates = (dates != null) ? dates : "[]"; // Empty JSON array
  this.timings = (timings != null) ? timings : "[]"; // Empty JSON array
  this.seats = (seats != null) ? seats : "{}"; // Empty JSON object
}


}