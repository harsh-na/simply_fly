package com.hexw.web.Dao;

import com.hexw.web.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    // Additional queries for user-specific operations can be defined here
}