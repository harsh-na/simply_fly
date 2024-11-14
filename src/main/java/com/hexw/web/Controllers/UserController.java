package com.hexw.web.Controllers;

import com.hexw.web.Models.Flight;
import com.hexw.web.Models.User;
import com.hexw.web.Services.UserServices;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserServices userServices;

	// Create a new user
	@PostMapping("/create")
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		try {
			User createdUser = userServices.createUser(user);
			return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	// Update user information
	@PutMapping("/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable Long userId, @Valid @RequestBody User userDetails) {
		try {
			User updatedUser = userServices.updateUser(userId, userDetails);
			if (updatedUser != null) {
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	// Get user by ID
	@GetMapping("/{userId}")
	public ResponseEntity<User> getUser(@PathVariable Long userId) {
		try {
			Optional<User> user = userServices.getUser(userId);
			return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
					.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	// Delete user by ID
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
		try {
			userServices.deleteUser(userId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
