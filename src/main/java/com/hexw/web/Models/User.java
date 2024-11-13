package com.hexw.web.Models;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@NotBlank(message = "Name is required")
	@Size(max = 100, message = "Name should not exceed 100 characters")
	private String name;

	@NotBlank(message = "Email is required")
	@Email(message = "Email should be valid")
	@Column(unique = true)
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password should be at least 8 characters long")
	private String password;

	@NotBlank(message = "Confirm password is required")
	@Size(min = 8, message = "Confirm password should be at least 8 characters long")
	private String confirmPassword;

	@NotBlank(message = "Gender is required")
	private String gender;

	@NotNull(message = "Contact number is required")
	@Digits(integer = 10, fraction = 0, message = "Contact should be a 10-digit number")
	private Long contact;

	@NotBlank(message = "Address is required")
	@Size(max = 255, message = "Address should not exceed 255 characters")
	private String address;

	@NotNull(message = "Date of Birth is required")
	@Past(message = "Date of Birth should be in the past")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dateOfBirth;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = false)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;

	@NotBlank(message = "Role is required")
	private String role;

	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = new Date();
	}

	@Override
	public String toString() {
		return "UserModel [userId=" + userId + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", confirmPassword=" + confirmPassword + ", gender=" + gender + ", contact=" + contact + ", address="
				+ address + ", dateOfBirth=" + dateOfBirth + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ ", role=" + role + "]";
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Long getContact() {
		return contact;
	}

	public void setContact(Long contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public User() {

	}

	public User(Long userId, String name, String email, String password, String confirmPassword, String gender,
			Long contact, String address, Date dateOfBirth, Date createdAt, Date updatedAt, String role) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.gender = gender;
		this.contact = contact;
		this.address = address;
		this.dateOfBirth = dateOfBirth;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.role = role;
	}

}
