package com.hexw.web.Services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexw.web.Dao.FlightRepo;
import com.hexw.web.Dao.UserRepo;
import com.hexw.web.Models.Flight;
import com.hexw.web.Models.User;

@Service
public class UserServices {

	@Autowired
	private UserRepo userRepo;

	public User createUser(User user) {
		return userRepo.save(user);
	}

	public User updateUser(Long userId, User userDetails) {
		Optional<User> existingUser = userRepo.findById(userId);
		if (existingUser.isPresent()) {
			User user = existingUser.get();
			user.setName(userDetails.getName());
			user.setEmail(userDetails.getEmail());
			user.setPassword(userDetails.getPassword());
			user.setGender(userDetails.getGender());
			user.setContact(userDetails.getContact());
			user.setAddress(userDetails.getAddress());
			user.setDateOfBirth(userDetails.getDateOfBirth());
			user.setRole(userDetails.getRole());
			return userRepo.save(user);
		}
		return null;
	}

	public Optional<User> getUser(Long userId) {
		return userRepo.findById(userId);
	}

	public void deleteUser(Long userId) {
		userRepo.deleteById(userId);
	}

}
