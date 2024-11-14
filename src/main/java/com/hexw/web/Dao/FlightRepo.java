package com.hexw.web.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexw.web.Models.Flight;

import java.util.List;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Long> {

    // Custom query using JSON functions to extract dates
//    @Query(value = "SELECT * FROM flights f WHERE f.origin = :origin AND f.destination = :destination " +
//                   "AND JSON_UNQUOTE(JSON_EXTRACT(f.dates, '$.departureDate')) = :departureDate " +
//                   "AND (:returnDate IS NULL OR JSON_UNQUOTE(JSON_EXTRACT(f.dates, '$.returnDate')) = :returnDate)",
//           nativeQuery = true)
	
//    @Query(value = "SELECT * FROM flights f WHERE f.origin = :origin AND f.destination = :destination " +
//            "AND f.dates LIKE %:departureDate%",
//    nativeQuery = true)
	@Query(value = "SELECT * FROM flights f WHERE f.origin = :origin AND f.destination = :destination " +
            "AND f.dates LIKE %:departureDate% " +
            "AND (:returnDate IS NULL OR f.dates LIKE %:returnDate%)",
    nativeQuery = true)

    List<Flight> findByOriginAndDestinationAndDates(@Param("origin") String origin,
                                                    @Param("destination") String destination,
                                                    @Param("departureDate") String departureDate,
                                                    @Param("returnDate") String returnDate);
    

    // Custom query for one-way flights
//    @Query(value = "SELECT * FROM flights f WHERE f.origin = :origin AND f.destination = :destination " +
//                   "AND JSON_UNQUOTE(JSON_EXTRACT(f.dates, '$.departureDate')) = :departureDate",
//           nativeQuery = true)
    @Query(value = "SELECT * FROM flights f WHERE f.origin = :origin AND f.destination = :destination " +
            "AND f.dates LIKE %:departureDate%",
    nativeQuery = true)
    List<Flight> findByOriginAndDestinationAndDepartureDate(@Param("origin") String origin,
                                                            @Param("destination") String destination,
                                                            @Param("departureDate") String departureDate);
}
