package com.hexw.web.dao;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexw.web.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    // Additional queries for user-specific operations can be defined here
	User findByEmail(String email);

}