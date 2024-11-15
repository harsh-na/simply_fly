package com.hexw.web.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "passengers")
public class Passengers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "passenger_id")
	private Long passengerId;

	@NotBlank(message = "Full name is required")
	@Size(max = 100, message = "Full name should not exceed 100 characters")
	@Column(name = "full_name", nullable = false, length = 100)
	private String fullName;

	@NotNull(message = "Age is required")
	@Min(value = 0, message = "Age must be a positive number")
	@Max(value = 120, message = "Age must be less than or equal to 120")
	@Column(name = "age", nullable = false)
	private Integer age;

	@NotBlank(message = "Email is required")
	@Email(message = "Email should be valid")
	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@NotNull(message = "Phone number is required")
	@Digits(integer = 10, fraction = 0, message = "Phone number should be a 10-digit number")
	@Column(name = "phone", nullable = false, unique = true)
	private Long phone;

	@NotBlank(message = "Seat type is required")
	@Size(max = 20, message = "Seat type should not exceed 20 characters")
	@Column(name = "seat_type", nullable = false, length = 20)
	private String seatType;

	@NotNull(message = "Seat number is required")
	@Positive(message = "Seat number must be positive")
	@Column(name = "seat_no", nullable = false)
	private Integer seatNo;

	@Override
	public String toString() {
		return "Passengers [passengerId=" + passengerId + ", fullName=" + fullName + ", age=" + age + ", email=" + email
				+ ", phone=" + phone + ", seatType=" + seatType + ", seatNo=" + seatNo + "]";
	}

	public Long getPassengerId() {
		return passengerId;
	}

	public void setPassengerId(Long passengerId) {
		this.passengerId = passengerId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getSeatType() {
		return seatType;
	}

	public void setSeatType(String seatType) {
		this.seatType = seatType;
	}

	public Integer getSeatNo() {
		return seatNo;
	}

	public void setSeatNo(Integer seatNo) {
		this.seatNo = seatNo;
	}

	// Default constructor
	public Passengers() {
	}

	// All-args constructor
	public Passengers(String fullName, Integer age, String email, Long phone, String seatType, Integer seatNo) {
		this.fullName = fullName;
		this.age = age;
		this.email = email;
		this.phone = phone;
		this.seatType = seatType;
		this.seatNo = seatNo;
	}
}
