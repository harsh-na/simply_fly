package com.hexw.web.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexw.web.models.Payments;

public interface PaymentRepo extends JpaRepository<Payments,Long>{

	Optional<Payments> findByUserId(Long userId);

}
