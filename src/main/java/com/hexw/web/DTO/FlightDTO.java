package com.hexw.web.dto;

import java.util.List;
import java.util.Map;

public class FlightDTO {

    private Long flightId;
    private Long companyId;
    private String flightNo;
    private String origin;
    private String destination;
    private Integer totalSeats;
    private Integer availableSeats;
    private String seatTypes;
    private Integer fare;
    private String baggageInfo;
    private Long bookingId;
    private List<String> dates;
    private List<Map<String, String>> timings;
    private Map<String, Boolean> seats;

    // Getters and Setters
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

    public List<String> getDates() {
        return dates;
    }

    public void setDates(List<String> dates) {
        this.dates = dates;
    }

    public List<Map<String, String>> getTimings() {
        return timings;
    }

    public void setTimings(List<Map<String, String>> timings) {
        this.timings = timings;
    }

    public Map<String, Boolean> getSeats() {
        return seats;
    }

    public void setSeats(Map<String, Boolean> seats) {
        this.seats = seats;
    }
}
