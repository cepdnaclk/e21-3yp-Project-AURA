package com.aura.system.repositories;

import com.aura.system.entities.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {

    // Find all items in a category (e.g. "drinks", "mains")
    List<MenuItem> findByCategory(String category);

    // Find only available items
    List<MenuItem> findByAvailabilityTrue();

    // Find available items in a specific category
    List<MenuItem> findByCategoryAndAvailabilityTrue(String category);

    // Search by name keyword — e.g. "pizza"
    List<MenuItem> findByNameContainingIgnoreCase(String keyword);

    // Find items under a certain price
    List<MenuItem> findByPriceLessThanEqual(Float maxPrice);
}
