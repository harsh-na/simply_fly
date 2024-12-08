package com.hexw.web.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexw.web.dto.UserDTO;
import com.hexw.web.exceptions.InvalidCredentialsException;
import com.hexw.web.exceptions.UserAlreadyExistsException;
import com.hexw.web.exceptions.UserNotFoundException;
import com.hexw.web.models.User;
import com.hexw.web.services.UserDetailsServiceImpl;
import com.hexw.web.services.UserServices;
import com.hexw.web.utils.JwtUtil;

import io.jsonwebtoken.lang.Collections;
import jakarta.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServices userServices;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    

    // Create a new user
    @PostMapping("/signup")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        try {
            UserDTO createdUser = userServices.createUser(userDTO);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new UserAlreadyExistsException("Failed to create user: " + e.getMessage());
        }
    }

//    // User login
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User user) {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
//            String jwt = jwtUtil.generateToken(userDetails.getUsername());
//            return new ResponseEntity<>(jwt, HttpStatus.OK);
//        } catch (Exception e) {
//            throw new InvalidCredentialsException("Incorrect username or password");
//        }
//    }
    
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody UserDTO user) {
//        try {
//            // Authenticate using email and password
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
//            );
//
//            // If authentication is successful, generate the JWT
//            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
//            String jwt = jwtUtil.generateToken(userDetails.getUsername());
//           
//            // Return the JWT token in the response
//            return new ResponseEntity<>(jwt,HttpStatus.OK);
//        } catch (BadCredentialsException e) {
//            // Handle incorrect credentials
//            throw new InvalidCredentialsException("Incorrect username or password");
//        } catch (Exception e) {
//            // Handle any unexpected errors
//            return new ResponseEntity<>("Login failed", HttpStatus.BAD_REQUEST);
//        }
//    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserDTO user) {
        try {
            // Authenticate using email and password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            // If authentication is successful, generate the JWT
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            // Get the role of the user
            String role = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("ROLE_USER");  // Default role if no role found

            // Prepare response with JWT and role
            Map<String, String> response = new HashMap<>();
            response.put("jwt", jwt);
            response.put("role", role);

            // Return the response
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (BadCredentialsException e) {
            // Handle incorrect credentials
            throw new InvalidCredentialsException("Incorrect username or password");
        } catch (Exception e) {
            // Handle any unexpected errors
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Login failed");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }



    // Update user information
    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId, @Valid @RequestBody UserDTO userDTO) {
        try {
            UserDTO updatedUser = userServices.updateUser(userId, userDTO);
            if (updatedUser != null) {
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            } else {
                throw new UserNotFoundException("User not found with ID: " + userId);
            }
        } catch (Exception e) {
            throw new InvalidCredentialsException("Failed to update user: " + e.getMessage());
        }
    }

    // Get user by ID
    @GetMapping("/{userId}")
   public ResponseEntity<UserDTO> getUser(@PathVariable Long userId) {
    
        Optional<UserDTO> user = userServices.getUser(userId);
       if (user.isPresent()) {
           return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
           throw new UserNotFoundException("User not found with ID: " + userId);
       }
    }
    
// // Updated getUserById method in UserController.java
//    @GetMapping("/{myId}")
//    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
//        // Fetch the currently authenticated user’s details
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userName = authentication.getName();
//        
//        // Retrieve the user based on the username
//        User user = userServices.findByUserName(userName);
//        
//        // Assuming that the User class has a collection of related entries like JournalEntries
//        List<User> filteredEntries = user.getUserId().stream()
//                                                  .filter(entry -> entry.getId().equals(myId))
//                                                  .collect(Collectors.toList());
//        
//        // Check if there are any matching entries
//        if (!filteredEntries.isEmpty()) {
//            Optional<JournalEntry> journalEntry = journalEntryService.findById(myId);
//            if (journalEntry.isPresent()) {
//                return new ResponseEntity<>(journalEntry.get(), HttpStatus.OK);
//            }
//        }
//        
//        // Return 404 if no entry is found
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }


    // Delete user by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        try {
            userServices.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
    }
}
