package com.hexw.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexw.web.models.Booking;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    // No additional methods required for basic CRUD
}
