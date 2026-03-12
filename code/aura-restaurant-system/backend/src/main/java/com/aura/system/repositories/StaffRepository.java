package com.aura.system.repositories;

import com.aura.system.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {

    // Find by username — used for login
    Optional<Staff> findByUsername(String username);

    // Find all staff with a specific role (e.g. "waiter", "chef")
    List<Staff> findByRole(String role);

    // Check if username already exists — used for registration
    boolean existsByUsername(String username);
}
