package com.hexw.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexw.web.models.Passengers;

@Repository
public interface PassengerRepo extends JpaRepository<Passengers, Long> {
    // No additional methods required for basic CRUD
}
