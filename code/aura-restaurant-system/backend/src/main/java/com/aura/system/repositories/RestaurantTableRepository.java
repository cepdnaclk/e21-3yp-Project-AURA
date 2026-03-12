package com.aura.system.repositories;

import com.aura.system.entities.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Integer> {

    // Find tables by status (e.g. "available", "occupied")
    List<RestaurantTable> findByStatus(String status);

    // Find tables that fit a party size
    List<RestaurantTable> findByCapacityGreaterThanEqual(Integer capacity);

    // Find by table number
    RestaurantTable findByTableNumber(String tableNumber);
}
