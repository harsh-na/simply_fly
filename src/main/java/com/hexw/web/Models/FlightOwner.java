package com.hexw.web.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "flight_owner")
public class FlightOwner {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "company_id")
	private Long companyId;

	@NotBlank(message = "Company name is required")
	@Size(max = 100, message = "Company name should not exceed 100 characters")
	@Column(name = "company_name", nullable = false, length = 100)
	private String companyName;

	@NotNull(message = "Flight IDs are required")
	@Lob
	@Column(name = "flight_id", columnDefinition = "TEXT", nullable = false)
	private String flightId;

	public FlightOwner() {
	}

	@Override
	public String toString() {
		return "FlightOwner [companyId=" + companyId + ", companyName=" + companyName + ", flightId=" + flightId + "]";
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getFlightId() {
		return flightId;
	}

	public void setFlightId(String flightId) {
		this.flightId = flightId;
	}

	public FlightOwner(String companyName, String flightId) {
		this.companyName = companyName;
		this.flightId = flightId;
	}
}
