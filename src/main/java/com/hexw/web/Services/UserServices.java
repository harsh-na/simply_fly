package com.hexw.web.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexw.web.dao.UserRepo;
import com.hexw.web.dto.UserDTO;
import com.hexw.web.exceptions.UserNotFoundException;
import com.hexw.web.mapper.UserMapper;
import com.hexw.web.models.User;

@Service
public class UserServices {

	@Autowired
	private UserRepo userRepo;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;

//	public UserDTO createUser(UserDTO userDTO) {
//		// Convert UserDTO to User entity
//		User user = UserMapper.toUserEntity(userDTO);
//		user.setName(userDTO.getName());
//		user.setEmail(userDTO.getEmail());
//		user.setPassword(userDTO.getPassword()); // Ensure password is set
//		user.setGender(userDTO.getGender());
//		user.setContact(userDTO.getContact());
//		user.setAddress(userDTO.getAddress());
//		user.setDateOfBirth(userDTO.getDateOfBirth());
//		user.setRole(userDTO.getRole());
//
//		// Save user in the database
//		User savedUser = userRepo.save(user);
//
//		// Convert saved User entity back to UserDTO
//		return UserMapper.toUserDTO(savedUser);
//	}
	
	public UserDTO createUser(UserDTO userDTO) {
        // Convert UserDTO to User entity
        User user = UserMapper.toUserEntity(userDTO);
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());

        // Encrypt the password before saving
        String encryptedPassword = passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(encryptedPassword);  // Set the encrypted password

        user.setGender(userDTO.getGender());
        user.setContact(userDTO.getContact());
        user.setAddress(userDTO.getAddress());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setRole(userDTO.getRole());

        // Save user in the database
        User savedUser = userRepo.save(user);

        // Convert saved User entity back to UserDTO
        return UserMapper.toUserDTO(savedUser);
    }

	public UserDTO updateUser(Long userId, UserDTO userDTO) {
		Optional<User> existingUser = userRepo.findById(userId);
		if (existingUser.isPresent()) {
			User user = existingUser.get();
			user.setName(userDTO.getName());
			user.setEmail(userDTO.getEmail());
			user.setGender(userDTO.getGender());
			user.setContact(userDTO.getContact());
			user.setAddress(userDTO.getAddress());
			user.setDateOfBirth(userDTO.getDateOfBirth());
			user.setRole(userDTO.getRole());
			User updatedUser = userRepo.save(user);
			return UserMapper.toUserDTO(updatedUser);
		}
		return null;
	}

	public Optional<UserDTO> getUser(Long userId) {
		Optional<User> user = userRepo.findById(userId);
		return user.map(UserMapper::toUserDTO);
	}

	public void deleteUser(Long userId) {
		userRepo.deleteById(userId);
	}
	

}
